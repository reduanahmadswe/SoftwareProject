# Test registration with proper PowerShell syntax
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    fullName = "Test User Live"
    email = "test.live.email@gmail.com"
    phone = "+8801712345678"
    institution = "Test University"
    yearOfStudy = "3rd Year"
} | ConvertTo-Json

Write-Host "🧪 Testing Frontend → Backend → Email Flow..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Direct backend test
Write-Host "1. 📡 Testing Backend API directly..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-RestMethod -Uri "https://git-github-workshop-backend.vercel.app/api/register" -Method POST -Headers $headers -Body $body -TimeoutSec 30
    Write-Host "   ✅ Backend Response: $($backendResponse | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: Check environment check endpoint
Write-Host "2. 🔧 Checking Backend Environment..." -ForegroundColor Yellow
try {
    $envResponse = Invoke-RestMethod -Uri "https://git-github-workshop-backend.vercel.app/api/admin/env-check" -Method GET -TimeoutSec 15
    Write-Host "   ✅ Environment Status: $($envResponse | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Environment Check Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Direct email test
Write-Host "3. 📧 Testing Email Service..." -ForegroundColor Yellow
try {
    $emailResponse = Invoke-RestMethod -Uri "https://git-github-workshop-backend.vercel.app/api/admin/test-email" -Method GET -TimeoutSec 15
    Write-Host "   ✅ Email Test: $($emailResponse | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Email Test Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Test completed!" -ForegroundColor Magenta