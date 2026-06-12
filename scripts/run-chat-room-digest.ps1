$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$NodePath = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if (-not (Test-Path -LiteralPath $NodePath)) {
  $NodePath = "node"
}

$secureKey = Read-Host "Paste Hyvor Console API Key" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)

try {
  $plainKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  $env:HYVOR_WEBSITE_ID = "15519"
  $env:HYVOR_CONSOLE_API_KEY = $plainKey

  Push-Location $Root
  try {
    & $NodePath scripts\build-chat-room-digest.js
  } finally {
    Pop-Location
  }
} finally {
  if ($bstr -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
  Remove-Variable plainKey -ErrorAction SilentlyContinue
  Remove-Item Env:\HYVOR_CONSOLE_API_KEY -ErrorAction SilentlyContinue
}
