# Backend Deployment Script (Vercel)

Write-Host "⚙️ Starting Backend Deployment to Vercel..." -ForegroundColor Cyan

# Navigate to backend directory
Set-Location backend

# Check if Vercel CLI is installed
if (-not (Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "🔨 Building backend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Check if user is logged in to Vercel
Write-Host "🔐 Checking Vercel authentication..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Vercel..." -ForegroundColor Yellow
    vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Vercel login failed" -ForegroundColor Red
        exit 1
    }
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend deployed successfully!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Copy your backend URL" -ForegroundColor White
Write-Host "   2. Set environment variables in Vercel dashboard:" -ForegroundColor White
Write-Host "      - DATABASE_URL" -ForegroundColor Gray
Write-Host "      - JWT_SECRET" -ForegroundColor Gray
Write-Host "      - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS" -ForegroundColor Gray
Write-Host "      - FRONTEND_URL" -ForegroundColor Gray
Write-Host "   3. Test API endpoints" -ForegroundColor White

# Return to root directory
Set-Location ..