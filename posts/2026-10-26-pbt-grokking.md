---
title: PBT can't make a model grok faster, but it can find the way out
date: 2026-10-26
tags: machine learning, research
description: Population Based Training over learning rate and weight decay, on the same grokking task as before. It never beat a good fixed setting, but from a range where nothing groks it found a way out, and the path it found works on its own.
repo: grok-pbt
---
In my [grokking post](grok-grok.html) the model only made its late jump to perfect validation accuracy with weight decay switched on. Turn it off and the jump never came. That makes weight decay, and the learning rate it works against, the two knobs that decide whether grokking happens at all.

So I wanted to know whether those knobs could be found automatically, during training, instead of by grid search beforehand. Population Based Training (PBT) is built for exactly that: train a population of models, and every so often let the worst ones copy the weights and settings of the best ones, then nudge the copied settings a little. The question was whether that gets a model to generalize faster than fixed settings.

It doesn't. But it does something else that turned out to be more interesting.

## The setup

The task is the same one: addition modulo 97, trained on 35% of all pairs, with the rest split evenly into validation and test. The model is small: one shared embedding table for both numbers (97 by 128), the two embeddings concatenated, a 256-wide hidden layer with ReLU, and a 97-way output. Training is full batch.

Every run is a population of 20 models trained side by side for 20,000 steps. I wrote AdamW by hand with the population as an extra leading dimension, so all 20 train in one batched pass on the GPU, each with its own learning rate (lr) and weight decay (wd).

PBT works like this. At every interval, rank the 20 members by validation loss. The bottom 20% (4 members) each copy the weights, optimizer state and knobs of a random member from the top 20%, then multiply their lr and wd by a random factor. lr is clipped to [1e-5, 1e-1] and wd to [1e-3, 10].

The score is the first step at which any member reaches 95% validation accuracy, checked every 50 steps. Test accuracy is for the member with the best final validation accuracy, and test data is never used to choose anything.

## First try: PBT against a grid

Equal compute on both sides: a grid of 5 learning rates by 4 weight decays (20 fixed runs) against a PBT population of 20, starting from random settings across the same ranges.

| Method | Steps to 95% val accuracy (3 seeds) | Test accuracy |
|---|---|---|
| Best fixed grid cell (lr 1e-2, wd 5) | 317 ± 29 | 100% |
| PBT, 20 members | 2667 ± 2244 | 100% |

PBT was slower in all three seeds, about 8 times slower on average.

That's not a fair fight, though, and the grid shows why. The best cell sits in the corner of the grid, the highest lr and highest wd I allowed. The grid effectively contained the answer. PBT's first chance to copy anything was at step 500, by which point the best fixed setting had already finished. Unless one of PBT's random starting members happened to land near that corner, it couldn't win.

So the honest conclusion from this run is narrow: PBT doesn't beat a grid that already contains a good setting. The more useful question is what happens when nothing in the starting range works.

## Starting in the dead zone

For the second experiment every member starts in a region where nothing groks: lr between 1e-4 and 1e-3, wd between 0.01 and 0.08. In the first grid, no cell in that corner reached 95% in 20,000 steps.

Five conditions, three seeds each, with identical starting weights and knobs per seed:

- **A, PBT:** every 100 steps, with lr and wd halved or doubled.
- **B, slow PBT:** every 500 steps, with gentle ×0.8 or ×1.2 changes.
- **C, random donor:** like A, but the worst members copy a random member instead of a top one.
- **D, fixed:** no PBT, knobs never change.
- **E, no selection:** 4 random members copy random others. No ranking at all.

Fixed settings stayed stuck (0 of 3), as the grid predicted. So did slow PBT. Fast PBT escaped in all three seeds, at 6450, 7250 and 6850 steps, and by the end all 20 members were above 95%.

The way it escaped is the interesting part. Here is every member's lr and wd over the run, with the winning lineage traced back from the end:

<figure class="gpb-swarm" data-src="data/grok-pbt.json" data-swarm="assets/grok-pbt-swarm.bin">
  <div class="gpb-head">
    <div class="gpb-switch" role="group" aria-label="Condition">
      <button type="button" data-cond="A" aria-pressed="true">PBT</button>
      <button type="button" data-cond="C" aria-pressed="false">random donor</button>
      <button type="button" data-cond="E" aria-pressed="false">no selection</button>
      <button type="button" data-cond="D" aria-pressed="false">fixed</button>
    </div>
    <div class="gpb-switch" role="group" aria-label="Seed">
      <button type="button" data-seed="0" aria-pressed="true">seed 1</button>
      <button type="button" data-seed="1" aria-pressed="false">2</button>
      <button type="button" data-seed="2" aria-pressed="false">3</button>
    </div>
  </div>
  <canvas class="gpb-canvas" width="720" height="720" role="img" aria-label="The 20 members of a population plotted by learning rate and weight decay over 20,000 steps, with the winning lineage traced"></canvas>
  <div class="gpb-transport">
    <button type="button" class="gpb-btn" data-play>play</button>
    <label class="gpb-scrub"><span class="sr-only">Training step</span>
      <input type="range" min="0" max="199" value="0" step="1">
    </label>
  </div>
  <p class="gpb-readout" aria-live="polite"></p>
  <figcaption>Each ring is one member, placed by its learning rate (across) and weight decay (up), filled in blue once it reaches 95% validation accuracy. The violet trail is the lineage of the member that finished best. The shaded squares are the first experiment's fixed grid, darker where a fixed setting grokked sooner. The edges of the plot are the clip limits.</figcaption>
  <noscript><p>An animation of the population's learning rate and weight decay appears here with JavaScript on.</p></noscript>
</figure>

PBT goes the wrong way first. In all three seeds the learning rate sinks to its floor of 1e-5. Then weight decay climbs to its ceiling of 10. Only then does the learning rate come back up, and the members that grok first are sitting at wd 5 to 10 and lr 1e-3 to 5e-3. That's the same high-weight-decay region where the fixed grid grokked. After grokking the population moves again, to the highest lr and lowest wd allowed, and stays generalized there. Those last settings were never in the grid.

The detour has a cause. Early in training, while the models are still memorizing, validation loss is lower for members with a small lr × wd. So ranking by validation loss pushes the population toward less weight decay, which is the opposite of what grokking needs.

<figure class="gpb-signal" data-src="data/grok-pbt.json">
  <p class="gpb-legend"><span class="gpb-key gpb-key-a">PBT</span><span class="gpb-key gpb-key-b">slow PBT</span><span class="gpb-key gpb-key-d">fixed</span></p>
  <svg class="gpb-plot" viewBox="0 0 660 300" tabindex="0" role="img" aria-label="Rank correlation between validation loss and lr times wd over training, for PBT, slow PBT and fixed settings; use the arrow keys to move along the steps"></svg>
  <p class="gpb-readout" aria-live="polite"></p>
  <figcaption>Spearman correlation between each member's validation loss and its lr × wd, across the 20 members at each interval. Above zero, members with less regularization look better, so selection pushes the population that way. Thin lines are seeds, thick lines their mean.</figcaption>
</figure>

The correlation starts strongly positive in every condition, around 0.5 to 0.8. In fast PBT it flips to strongly negative between about 2,500 and 7,000 steps, and selection starts pulling toward more regularization. Once the population has grokked it swings back positive: lower weight decay now gives lower validation loss, which is what pushes the population to the weight-decay floor at the end. Slow PBT never gets there. Its correlation stays positive for about 10,000 steps, and its population just keeps drifting toward less regularization.

Part of the flip happens with time alone: with fixed knobs the correlation also drifts from about +0.65 to about −0.65 over the run. So PBT isn't creating the signal. It's following a signal that misleads early and becomes useful later.

The two ablations say which parts of PBT matter. With a random donor (C) the population still escaped in all three seeds, just later (7600, 13250 and 13400 steps). With no selection at all (E), a member reached 95% in two seeds and then the whole population lost it again within one interval, ending near 2% test accuracy. Replacing the worst members is what keeps a grokked member alive. Copying from the best ones mostly makes it faster.

## Ten seeds, and a fairer baseline

Three seeds is very few, so I reran the main conditions on 10 seeds. I also added the obvious baseline: plain random search over the wide range (W), 20 fixed members with no PBT. And I added PBT starting from that same wide range (AW).

<figure class="gpb-steps" data-src="data/grok-pbt.json">
  <svg class="gpb-plot" viewBox="0 0 660 340" role="img" aria-label="Steps to 95% validation accuracy for each of 10 seeds under five conditions, on a log scale, with medians"></svg>
  <p class="gpb-readout" aria-live="polite"></p>
  <figcaption>One dot per seed. Hollow dots never reached 95% in 20,000 steps and are drawn at the top; bars are medians, counting those as 20,000. Hover or tab to a dot for its seed.</figcaption>
</figure>

Random search over the wide range hit 95% at a median of 300 steps, in 10 of 10 seeds. PBT from the dead zone took a median of 6650, and failed twice. The wide range contains a good setting from step 0, so this is the first experiment's caveat again. With a range that contained no grokking region, random search would sit there like the fixed condition did.

PBT on the wide range was no faster than random search: identical in 8 of 10 seeds, because both contain the same lucky member and its run is the same until PBT first replaces it. At the end, 90% of PBT's members had generalized against 26% for random search, but that's not speed.

And PBT can hurt. In one seed random search found a member that grokked at step 4750, with lr 0.086 and wd 0.032. It didn't look good by validation loss while it was memorizing, and with PBT on that seed the population instead collapsed into the corner at the lr floor and wd ceiling within about 2,000 steps and never left. Fast PBT's two failures from the dead zone were the same collapse.

The statistics are thin. Fast PBT beat the random donor in 8 of 10 paired seeds, but the paired test isn't significant (p = 0.23). The only comparison under 0.05 is PBT from the dead zone against PBT from the wide range (p = 0.047), and that one compares starting ranges as much as methods.

## Is it the weights or the schedule?

PBT does two things at once: it changes the knobs, and it copies weights between members. To separate them, I took the winning lineage's lr and wd over time from each of the first three seeds and replayed them on 20 fresh, randomly initialized models, with no copying and no selection.

<figure class="gpb-replay" data-src="data/grok-pbt.json">
  <div class="gpb-head">
    <div class="gpb-switch" role="group" aria-label="Schedule">
      <button type="button" data-kind="lineage" aria-pressed="true">PBT's schedule</button>
      <button type="button" data-kind="const" aria-pressed="false">constant</button>
      <button type="button" data-kind="phased" aria-pressed="false">my 3 phases</button>
    </div>
    <div class="gpb-switch" role="group" aria-label="Seed">
      <button type="button" data-seed="0" aria-pressed="true">seed 1</button>
      <button type="button" data-seed="1" aria-pressed="false">2</button>
      <button type="button" data-seed="2" aria-pressed="false">3</button>
    </div>
    <p class="gpb-readout" aria-live="polite"></p>
  </div>
  <svg class="gpb-plot" viewBox="0 0 660 420" role="img" aria-label="The learning rate and weight decay schedule, and the validation accuracy of 20 fresh models trained on it without PBT"></svg>
  <figcaption>Top two panels: the learning rate and weight decay used at each step. Bottom: validation accuracy of the 20 fresh models trained on that schedule, best member (solid) and median (dashed). The dotted line is 95%.</figcaption>
</figure>

The schedule alone worked: 55 of 60 fresh models reached 95% (20, 18 and 17), at about the same time as the original runs. Constant knobs at the schedule's geometric average, up to the point it grokked, got none of 60. So the path through lr and wd carries the result, not the copied weights.

I also tried to simplify the path into three flat phases: tiny lr and moderate wd, then moderate lr with wd at the ceiling, then lr at the ceiling and wd at the floor. It mostly failed, and the plot shows why. Members got to 60 to 98% validation accuracy earlier than the real schedule, then collapsed to zero exactly when my third phase jumped the learning rate to 0.1 in one step. The real lineage raises it gradually. That's a flaw in my simplification, not evidence that simple schedules can't work. I didn't test a smoother version.

## What I'd take from it

PBT never made grokking faster than a fixed setting that was already in range. What it did, from a range where nothing generalizes, was find a way out, by first going the wrong way. And that way out is a learning-rate and weight-decay schedule you can run without PBT.

Some limits. Everything here is one task, one small model and one data split. The seed counts are 3 and 10. The schedules I replayed are the winners of their runs, so they're selected after the fact, and I haven't replayed them on new splits. The explanations for the no-selection collapses and for the correlation's sign flip are hypotheses I haven't tested. And the open question is the one this experiment was built to circle: a range with no grokking region at all is where PBT should beat random search, and I haven't run it.
