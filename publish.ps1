# Build the site and push whatever changed to the live domain.
# Usage:  .\publish.ps1 "optional commit message"

param([string]$Message = "Update site content")

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Building..." -ForegroundColor Cyan
python build.py
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Not publishing." -ForegroundColor Red
    exit 1
}

if (-not (git status --porcelain)) {
    Write-Host "Nothing changed. Nothing to publish." -ForegroundColor Yellow
    exit 0
}

git add -A
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed." -ForegroundColor Red
    exit 1
}

git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. Your commit is saved locally; fix the issue and run 'git push' by hand." -ForegroundColor Red
    exit 1
}

Write-Host "Published. Live at https://sslog.dpdns.org within a minute or two." -ForegroundColor Green
