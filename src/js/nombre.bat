@echo off
title Convertidor de Nombre a Arte ASCII
powershell -NoProfile -ExecutionPolicy Bypass -Command "$s=(Get-Content -LiteralPath '%~f0' | Select-Object -Skip 5 | Out-String); & ([scriptblock]::Create($s)) %*"
exit /b

# PowerShell Code Starts Here
$Host.UI.RawUI.WindowTitle = "Convertidor de Nombre a Arte ASCII"

$font = @{
    'A' = @("  ___  ", " / _ \ ", "/ ___ \", "/_/   \_\")
    'B' = @(" ____  ", "|  _ \ ", "| |_) |", "|____/ ")
    'C' = @("  ___  ", " / __| ", "| (__  ", " \___| ")
    'D' = @(" ____  ", "|  _ \ ", "| |_) |", "|____/ ")
    'E' = @(" _____ ", "| ____|", "|  _|  ", "|_____|")
    'F' = @(" _____ ", "|  ___|", "| |_   ", "|_|    ")
    'G' = @("  ____ ", " / ___|", "| |  _ ", " \____|")
    'H' = @(" _   _ ", "| | | |", "| |_| |", "|_| |_|")
    'I' = @(" ___ ", " |_ _|", "  | | ", " |___|")
    'J' = @("     _ ", "    | |", " _  | |", "\ \_/ /")
    'K' = @(" _  __ ", "| |/ / ", "| ' <  ", "|_|\_\ ")
    'L' = @(" _     ", "| |    ", "| |___ ", "|_____|")
    'M' = @(" __  __ ", "|  \/  |", "| |\/| |", "|_|  |_|")
    'N' = @(" _   _ ", "| \ | |", "|  \| |", "|_|\__|")
    'O' = @("  ___  ", " / _ \ ", "| (_) |", " \___/ ")
    'P' = @(" ____  ", "|  _ \ ", "|  __/ ", "|_|    ")
    'Q' = @("  ___  ", " / _ \ ", "| (_) |", " \__\_|")
    'R' = @(" ____  ", "|  _ \ ", "|  _ < ", "|_| \_\")
    'S' = @(" ___ ", "/ __|", "\__ \", "|___/")
    'T' = @(" _____ ", "|_   _|", "  | |  ", "  |_|  ")
    'U' = @(" _   _ ", "| | | |", "| |_| |", " \___/ ")
    'V' = @(" __   __ ", " \ \ / / ", "  \ V /  ", "   \_/   ")
    'W' = @(" __      __ ", " \ \    / / ", "  \ \/\/ /  ", "   \_/\_/   ")
    'X' = @(" __  __ ", " \ \/ / ", "  >  <  ", " /_/\_\ ")
    'Y' = @(" __   __ ", " \ \ / / ", "  \ V /  ", "   |_|   ")
    'Z' = @(" _____ ", "|___  |", "   / / ", "  /_/  ")
    '0' = @("  ___  ", " / _ \ ", "| | | |", " \___/ ")
    '1' = @("  _  ", " / | ", " | | ", " |_| ")
    '2' = @(" ___ ", "|_  )", " / / ", "/___|")
    '3' = @(" ____ ", "|__  |", "  _ < ", "|___/ ")
    '4' = @(" _  _ ", "| || |", "| || |", "|_||_|")
    '5' = @(" ___ ", "|  _|", "|_  \", "|___/")
    '6' = @("  __ ", " / / ", "/ _ \", "\___/")
    '7' = @(" _____ ", "|___  |", "   / / ", "  /_/  ")
    '8' = @(" ___ ", "( _ )", "/ _ \", "\___/")
    '9' = @("  ___ ", " / _ \", " \_  /", "  /_/ ")
    ' ' = @("   ", "   ", "   ", "   ")
}

# Normalización automática de anchos (Auto-padding)
foreach ($key in @($font.Keys)) {
    $lines = $font[$key]
    $maxLen = 0
    foreach ($line in $lines) {
        if ($line.Length -gt $maxLen) { $maxLen = $line.Length }
    }
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $lines[$i] = $lines[$i].PadRight($maxLen)
    }
    $font[$key] = $lines
}

function Render-Text($inputText) {
    if ([string]::IsNullOrWhitespace($inputText)) { return }
    $texto = $inputText.ToUpper()
    $output = @("", "", "", "")

    foreach ($char in $texto.ToCharArray()) {
        $key = $char.ToString()
        if ($font.ContainsKey($key)) {
            $letra = $font[$key]
            for ($i = 0; $i -lt 4; $i++) {
                $output[$i] += $letra[$i] + " "
            }
        } else {
            for ($i = 0; $i -lt 4; $i++) {
                $output[$i] += "    "
            }
        }
    }

    Write-Host ""
    foreach ($line in $output) {
        Write-Host $line -ForegroundColor Green
    }
    Write-Host ""
}

Clear-Host

# Si se pasa un argumento por línea de comandos (ej. nombre.bat NAVIDAD)
if ($args.Count -gt 0) {
    $argText = $args -join " "
    Render-Text $argText
    pause
    exit
}

# Modo interactivo
while ($true) {
    Write-Host "======================================================" -ForegroundColor DarkGray
    $inputText = Read-Host "Introduce un nombre (o escribe 'salir' para terminar)"
    
    if ([string]::IsNullOrWhitespace($inputText)) { continue }
    if ($inputText.Trim().ToLower() -eq "salir") { break }

    Render-Text $inputText
}