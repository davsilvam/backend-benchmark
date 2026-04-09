param(
  [Parameter(Mandatory=$true)]
  [string]$BaseUrl
)

$ErrorActionPreference = "Stop"

function Test-Status($path, $expected) {
  $resp = Invoke-WebRequest -Uri "$BaseUrl$path" -Method Get
  if ($resp.StatusCode -ne $expected) { throw "$path status $($resp.StatusCode) != $expected" }
  Write-Host "OK $path status=$expected"
  return $resp
}

function Test-JsonHas($json, $key) {
  if (-not ($json.PSObject.Properties.Name -contains $key)) {
    throw "missing key '$key'"
  }
}

# health
$h = Test-Status "/api/health" 200
$hJson = $h.Content | ConvertFrom-Json
Test-JsonHas $hJson "status"

# compute
$c = Test-Status "/api/compute?n=10" 200
$cJson = $c.Content | ConvertFrom-Json
Test-JsonHas $cJson "result"

# users list
$u = Test-Status "/api/users" 200
$uJson = $u.Content | ConvertFrom-Json
if ($uJson -isnot [System.Array]) { throw "/api/users is not array" }

# users raw
$ur = Test-Status "/api/users/raw" 200
$urJson = $ur.Content | ConvertFrom-Json
if ($urJson -isnot [System.Array]) { throw "/api/users/raw is not array" }

# create user
$uniq = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$body = @{ name = "bench-user"; email = "bench-$uniq@test.local" } | ConvertTo-Json
$p = Invoke-WebRequest -Uri "$BaseUrl/api/users" -Method Post -ContentType "application/json" -Body $body
if ($p.StatusCode -ne 201) { throw "/api/users POST status $($p.StatusCode) != 201" }
$pJson = $p.Content | ConvertFrom-Json
Test-JsonHas $pJson "id"
Test-JsonHas $pJson "name"
Test-JsonHas $pJson "email"
Test-JsonHas $pJson "created_at"

Write-Host "`nSmoke test PASS for $BaseUrl"
