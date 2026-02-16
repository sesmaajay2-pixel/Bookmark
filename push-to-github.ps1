#!/usr/bin/env pwsh

# Navigate to app directory
Set-Location "c:\Users\sesma\Downloads\app-main"

# Configure git
git config user.email "dev@bookmark.local"
git config user.name "Bookmark Developer"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Bookmark manager application with real-time sync"

# Set main as default branch
git branch -M main

# Add remote origin
git remote add origin https://github.com/sesmaajay2-pixel/Bookmark.git

# Push to GitHub
git push -u origin main

Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "Repository: https://github.com/sesmaajay2-pixel/Bookmark" -ForegroundColor Cyan
