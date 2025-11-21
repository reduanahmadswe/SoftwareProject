# Frontend Deployment Script (Vercel)

Write-Host "🎨 Starting Frontend Deployment to Vercel..." -ForegroundColor Cyan

# Navigate to frontend directory
Set-Location frontend

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
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
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

Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Copy your frontend URL" -ForegroundColor White
Write-Host "   2. Set VITE_API_URL environment variable with your backend URL" -ForegroundColor White
Write-Host "   3. Update CORS settings in backend if needed" -ForegroundColor White

# Return to root directory
Set-Location ..