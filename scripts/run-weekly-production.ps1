$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$NodePath = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if (-not (Test-Path -LiteralPath $NodePath)) {
  $NodePath = "node"
}

Push-Location $Root
try {
  & $NodePath scripts\run-weekly-production.js @args
} finally {
  Pop-Location
}
