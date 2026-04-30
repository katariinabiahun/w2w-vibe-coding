<#
PowerShell static file server (no Python required).
Usage:
  powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8000 -Root .
Then open http://localhost:8000/
#>
param(
  [int]$Port = 8000,
  [string]$Root = (Get-Location).Path
)

Add-Type @"
using System;
using System.IO;
using System.Net;
using System.Text;
"@

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Serving $Root on http://localhost:$Port/ (Ctrl+C to stop)"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        $rel = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }

        $file = Join-Path $Root $rel
        if (Test-Path $file -PathType Leaf) {
            try {
                $bytes = [System.IO.File]::ReadAllBytes($file)
                switch ([IO.Path]::GetExtension($file).ToLower()) {
                    '.html' { $res.ContentType = 'text/html; charset=utf-8' }
                    '.css'  { $res.ContentType = 'text/css' }
                    '.js'   { $res.ContentType = 'application/javascript' }
                    '.json' { $res.ContentType = 'application/json' }
                    '.svg'  { $res.ContentType = 'image/svg+xml' }
                    '.png'  { $res.ContentType = 'image/png' }
                    '.jpg' { $res.ContentType = 'image/jpeg' }
                    '.jpeg' { $res.ContentType = 'image/jpeg' }
                    default { $res.ContentType = 'application/octet-stream' }
                }
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Close()
            } catch {
                $res.StatusCode = 500
                $msg = "500 Internal Server Error"
                $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
                $res.ContentType = 'text/plain; charset=utf-8'
                $res.ContentLength64 = $buf.Length
                $res.OutputStream.Write($buf,0,$buf.Length)
                $res.OutputStream.Close()
            }
        } else {
            $res.StatusCode = 404
            $msg = "404 Not Found"
            $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $res.ContentType = 'text/plain; charset=utf-8'
            $res.ContentLength64 = $buf.Length
            $res.OutputStream.Write($buf,0,$buf.Length)
            $res.OutputStream.Close()
        }
    }
} catch [System.Exception] {
    Write-Error "Server error: $($_.Exception.Message)"
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        $listener.Close()
    }
}
