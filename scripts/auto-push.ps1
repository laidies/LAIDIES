# LAIDIES Daily Auto-Push
# Runs at 7:15 AM via Windows Task Scheduler
# Commits any changes (from Hot Goss agent or manual edits) and pushes to GitHub

$ErrorActionPreference = "SilentlyContinue"
$repoPath = "C:\Users\alieakin\OneDrive - amazon.com\Documents\LAIDIES"

# Navigate to repo
Set-Location $repoPath

# Ensure git is configured
git config user.email "wednesday.laidies@gmail.com"
git config user.name "laidies"

# Check if there are any changes
$status = git status --porcelain 2>&1
if ($status) {
    # Stage everything
    git add -A
    
    # Create commit message with date
    $date = Get-Date -Format "MMM d"
    $msg = "Daily update - $date"
    
    # Commit
    git commit -m $msg
    
    # Push (retry once if fails)
    $pushResult = git push origin main 2>&1
    if ($LASTEXITCODE -ne 0) {
        Start-Sleep -Seconds 5
        git push origin main 2>&1
    }
    
    # Log result
    $logFile = "$repoPath\tmp\auto-push-log.txt"
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - Pushed: $msg" | Add-Content $logFile
} else {
    # Nothing to push
    $logFile = "$repoPath\tmp\auto-push-log.txt"
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - No changes to push" | Add-Content $logFile
}
