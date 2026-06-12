param(
  [Parameter(Position = 0)]
  [int]$Issue
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$WeeklyScript = Join-Path $Root "scripts\run-weekly-production.ps1"
$CommandCenter = Join-Path $Root "operations\weekly-command-center.html"

Push-Location $Root
try {
  if ($Issue) {
    & $WeeklyScript $Issue
  } else {
    & $WeeklyScript
  }

  Write-Host ""
  Write-Host "Opening lAIdies Weekly Command Center..."
  Write-Host $CommandCenter
  Start-Process -FilePath $CommandCenter
} finally {
  Pop-Location
}
