# File Watcher: Synchronizes content_cards.json into content_cards.js & content.json
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $baseDir) { $baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path } }
$jsonPath = Join-Path $baseDir "content_cards.json"
$jsPath = Join-Path $baseDir "content_cards.js"
$contentJsonPath = Join-Path $baseDir "content.json"

function Sync-Content {
    try {
        if (Test-Path $jsonPath) {
            $raw = Get-Content -Raw -Path $jsonPath -Encoding UTF8
            # Validate JSON
            $null = ConvertFrom-Json $raw
            
            # Write to content_cards.js
            $jsContent = "window.PORTFOLIO_CONTENT = " + $raw.Trim() + ";" + [Environment]::NewLine
            Set-Content -Path $jsPath -Value $jsContent -Encoding UTF8 -NoNewline
            
            # Keep content.json in sync
            Set-Content -Path $contentJsonPath -Value $raw -Encoding UTF8 -NoNewline
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Synced content_cards.json -> content_cards.js"
        }
    } catch {
        Write-Warning "Sync error: $_"
    }
}

# Run once initially
Sync-Content

# Setup FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $baseDir
$watcher.Filter = "content_cards.json"
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::Size

while ($true) {
    $result = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::Changed, 1000)
    if ($result.TimedOut -eq $false) {
        Start-Sleep -Milliseconds 150 # debounce rapid saves
        Sync-Content
    }
}
