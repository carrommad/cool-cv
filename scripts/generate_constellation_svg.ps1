# Generate refined balanced constellation SVG markup for CV and Cover Letter
$seed = 2026
$rng = New-Object System.Random($seed)

$width = 1000
$height = 1414
$numNodes = 88
$maxDist = 142

$nodes = @()
for ($i = 0; $i -lt $numNodes; $i++) {
    $x = [Math]::Round($rng.NextDouble() * ($width - 60) + 30, 1)
    $y = [Math]::Round($rng.NextDouble() * ($height - 60) + 30, 1)
    $r = [Math]::Round($rng.NextDouble() * 1.8 + 1.6, 1)
    $alpha = [Math]::Round($rng.NextDouble() * 0.28 + 0.24, 2)
    $nodes += [PSCustomObject]@{ x = $x; y = $y; r = $r; a = $alpha }
}

$linesSvg = New-Object System.Text.StringBuilder
$nodesSvg = New-Object System.Text.StringBuilder

$linesSvg.AppendLine('  <!-- Constellation Connection Hairlines -->') | Out-Null
for ($i = 0; $i -lt $nodes.Count; $i++) {
    for ($j = $i + 1; $j -lt $nodes.Count; $j++) {
        $dx = $nodes[$i].x - $nodes[$j].x
        $dy = $nodes[$i].y - $nodes[$j].y
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)
        if ($dist -lt $maxDist) {
            $lineAlpha = [Math]::Round((1.0 - ($dist / $maxDist)) * 0.28, 3)
            $w = if ($dist -lt 75) { "0.95" } else { "0.70" }
            $linesSvg.AppendLine("  <line x1=`"$($nodes[$i].x)`" y1=`"$($nodes[$i].y)`" x2=`"$($nodes[$j].x)`" y2=`"$($nodes[$j].y)`" stroke=`"rgba(201, 42, 42, $lineAlpha)`" stroke-width=`"$w`" />") | Out-Null
        }
    }
}

$nodesSvg.AppendLine('  <!-- Constellation Nodes & Celestial Rings -->') | Out-Null
foreach ($n in $nodes) {
    if ($n.r -gt 2.7) {
        $nodesSvg.AppendLine("  <circle cx=`"$($n.x)`" cy=`"$($n.y)`" r=`"$([Math]::Round($n.r * 2.4, 1))`" stroke=`"rgba(201, 42, 42, 0.20)`" stroke-width=`"0.6`" fill=`"none`" />") | Out-Null
    }
    $nodesSvg.AppendLine("  <circle cx=`"$($n.x)`" cy=`"$($n.y)`" r=`"$($n.r)`" fill=`"rgba(201, 42, 42, $($n.a))`" />") | Out-Null
}

$svg = @"
<svg class="constellation-bg" viewBox="0 0 $width $height" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
$($linesSvg.ToString())
$($nodesSvg.ToString())
</svg>
"@

$svg | Out-File -FilePath "scratch/constellation.svg" -Encoding utf8
Write-Output "Constellation SVG successfully updated ($numNodes nodes)."
