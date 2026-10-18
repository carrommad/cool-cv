param([string]$path)
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$pages = [regex]::Matches($text, '/Type\s*/Page\b').Count
Write-Output "$path has $pages page(s)"
