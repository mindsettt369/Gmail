Add-Type -AssemblyName System.Drawing

function Create-GmailIcon {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][int]$size,
        [Parameter(Mandatory)][string]$outputPath
    )
    
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Red background
    $redColor = [System.Drawing.Color]::FromArgb(255, 234, 67, 53)
    $redBrush = New-Object System.Drawing.SolidBrush $redColor
    $g.FillRectangle($redBrush, 0, 0, $size, $size)
    
    # White envelope
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $pad = [int]($size * 0.12)
    $envW = $size - ($pad * 2)
    $envH = [int]($envW * 0.65)
    $envX = $pad
    $envY = [int](($size - $envH) / 2)
    $g.FillRectangle($whiteBrush, $envX, $envY, $envW, $envH)
    
    # M shape
    $penWidth = [float]($size * 0.055)
    $mPen = New-Object System.Drawing.Pen $redColor, $penWidth
    $mPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    
    $mx1 = [float]($envX + $envW * 0.1)
    $mx2 = [float]($envX + $envW * 0.9)
    $my1 = [float]($envY + $envH * 0.18)
    $my2 = [float]($envY + $envH * 0.82)
    $mxMid = [float]($envX + $envW * 0.5)
    $myMid = [float]($envY + $envH * 0.52)
    
    $pts = @(
        [System.Drawing.PointF]::new($mx1, $my1),
        [System.Drawing.PointF]::new($mxMid, $myMid),
        [System.Drawing.PointF]::new($mx2, $my1),
        [System.Drawing.PointF]::new($mx2, $my2),
        [System.Drawing.PointF]::new($mx1, $my2),
        [System.Drawing.PointF]::new($mx1, $my1)
    )
    $g.DrawLines($mPen, $pts)
    
    $g.Dispose()
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $outputPath"
}

$baseDir = "c:\Users\minds\OneDrive\Desktop\Gmail clone app"
Create-GmailIcon -size 192 -outputPath "$baseDir\icon-192.png"
Create-GmailIcon -size 512 -outputPath "$baseDir\icon-512.png"
Copy-Item "$baseDir\icon-192.png" "$baseDir\icon-192-maskable.png" -Force
Copy-Item "$baseDir\icon-512.png" "$baseDir\icon-512-maskable.png" -Force
Write-Host "All icons created successfully!"
