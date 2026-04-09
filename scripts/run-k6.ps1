param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,

  [ValidateSet("smoke", "load", "stress")]
  [string]$Profile = "smoke",

  [string[]]$Tests = @("health", "compute", "users-raw", "users-orm", "users-post"),

  [string]$ComputeN = "40"
)

$ErrorActionPreference = "Stop"

$testMap = @{
  "health"    = "k6/health.js"
  "compute"   = "k6/compute.js"
  "users-raw" = "k6/users-raw.js"
  "users-orm" = "k6/users-orm.js"
  "users-post"= "k6/users-post.js"
}

foreach ($test in $Tests) {
  if (-not $testMap.ContainsKey($test)) {
    throw "Teste invalido: $test"
  }

  $scriptPath = $testMap[$test]

  Write-Host "`n=== k6: $test ($Profile) em $BaseUrl ==="
  k6 run -e BASE_URL="$BaseUrl" -e K6_PROFILE="$Profile" -e COMPUTE_N="$ComputeN" "$scriptPath"
}
