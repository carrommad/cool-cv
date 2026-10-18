# Syncs content_cards.json to content_cards.js and content.json
$json = Get-Content -Raw -Path "content_cards.json"
Set-Content -Path "content_cards.js" -Value "window.PORTFOLIO_CONTENT = $json;"
Copy-Item -Force "content_cards.json" "content.json"
Write-Output "Synced content_cards.json -> content_cards.js and content.json successfully."
