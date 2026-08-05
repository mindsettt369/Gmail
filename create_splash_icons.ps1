Add-Type -AssemblyName System.Drawing

function Create-SplashIcon {
    param(
        [int]$outputSize,
        [string]$sourcePath,
        [string]$outputPath,
        [float]$logoScale = 0.42   # logo takes up 42% of the canvas (matching real Gmail splash)
    )

    # Load the source image (white bg M logo)
    $src = [System.Drawing.Image]::FromFile($sourcePath)

    # Create dark canvas
    $bmp = New-Object System.Drawing.Bitmap $outputSize, $outputSize
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Fill dark background #1f1f1f
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 31, 31, 31))
    $g.FillRectangle($bgBrush, 0, 0, $outputSize, $outputSize)

    # Calculate logo size and position (centered)
    $logoSize = [int]($outputSize * $logoScale)
    $logoX = [int](($outputSize - $logoSize) / 2)
    $logoY = [int](($outputSize - $logoSize) / 2)

    # Draw source image (M logo) onto dark canvas at calculated size
    # The source has white background - we need to draw it with white->transparent
    # Since we can't easily do color-key transparency in System.Drawing,
    # we'll use a different approach: draw the source with ColorMatrix to make white transparent

    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $cm = New-Object System.Drawing.Imaging.ColorMatrix
    # Identity matrix
    $cm.Matrix00 = 1; $cm.Matrix11 = 1; $cm.Matrix22 = 1; $cm.Matrix33 = 1; $cm.Matrix44 = 1

    # Set white as transparent using a color remap table
    $ia.SetColorKey(
        [System.Drawing.Color]::FromArgb(200, 200, 200),
        [System.Drawing.Color]::White
    )

    $destRect = New-Object System.Drawing.Rectangle $logoX, $logoY, $logoSize, $logoSize
    $g.DrawImage($src, $destRect, 0, 0, $src.Width, $src.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $bgBrush.Dispose()
    $ia.Dispose()
    $src.Dispose()
    $g.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $outputPath ($outputSize x $outputSize, logo at ${logoScale}x)"
}

$baseDir = "c:\Users\minds\OneDrive\Desktop\Gmail clone app"
$sourceIcon = "$baseDir\icon-512-clean.png"

Write-Host "Creating Gmail splash-style icons (dark bg, centered logo)..."

# Regular icons: logo at 42% of canvas size
Create-SplashIcon -outputSize 512 -sourcePath $sourceIcon -outputPath "$baseDir\icon-512.png" -logoScale 0.42
Create-SplashIcon -outputSize 192 -sourcePath $sourceIcon -outputPath "$baseDir\icon-192.png" -logoScale 0.42

# Maskable icons: logo at 55% (fits within the safe zone for maskable)
Create-SplashIcon -outputSize 512 -sourcePath $sourceIcon -outputPath "$baseDir\icon-512-maskable.png" -logoScale 0.55
Create-SplashIcon -outputSize 192 -sourcePath $sourceIcon -outputPath "$baseDir\icon-192-maskable.png" -logoScale 0.55

Write-Host ""
Write-Host "Done! All icons now have dark background (#1f1f1f) with centered M logo."
Write-Host "The PWA splash screen will now match the real Gmail app look."
