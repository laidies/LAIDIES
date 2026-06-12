Set-Location "C:\Users\alieakin\OneDrive - amazon.com\Documents\LAIDIES"
Write-Host "=== LAIDIES Deploy ===" -ForegroundColor Magenta

git add -A
Write-Host "`nStaged files:" -ForegroundColor Cyan
git status --short | Select-Object -First 60
$count = (git status --short | Measure-Object).Count
Write-Host "`n$count files total" -ForegroundColor Yellow

$msg = "Phase 2 polish + hub reworks: learn, this-week, community pages rebuilt; all game pages polished; persistent mini player; brand consistency; 19 UX fixes"
git commit -m $msg
Write-Host "`nCommit done. Pushing..." -ForegroundColor Cyan

git push
Write-Host "`n=== DONE ===" -ForegroundColor Green
