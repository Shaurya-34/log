---
title: On keeping a log instead of a blog
date: 2026-07-12
tags: writing, habits
description: Why lowering the bar for publishing raised the rate of thinking.
---
A blog implies an audience, and an audience implies a standard. Every
draft gets measured against an imagined reader, and most drafts lose.
A log implies nothing except that time passed and something happened
in it.

The distinction sounds cosmetic, but it changed what I actually wrote.
Entries got shorter, more frequent, and more honest. Half of them are
just a paragraph about a thing that didn't work.

## The mechanics

Each entry starts as a plain text file. No front matter beyond a date,
no categories to agonize over. If a note grows past a screenful, it
earns a title; otherwise it stays a fragment.

```
log/
├── 2026-07-12-log-not-blog.md
├── 2026-06-28-terminal-uis.md
└── 2026-05-09-no-highlighting.md

# one file, one thought. nothing else.
```

The publish step is a script that turns the folder into HTML and
copies it to the server. It takes about a second, which matters:
any friction between `save` and `published` becomes an excuse not
to write.

> !pull The best writing system is the one where the distance between
> having a thought and keeping it is as close to zero as you can
> make it.

## What changed

Three months in, the archive is already useful in a way the old blog
never was. When I hit a problem I vaguely remember solving, the answer
is usually in the log, including the two wrong approaches I tried
first, which is often the more valuable half.

Nobody reads it, as far as I know. That turns out to be a feature.

---

*Related: an earlier note on why I stopped using syntax highlighting
for a week. Same instinct, different medium.*
