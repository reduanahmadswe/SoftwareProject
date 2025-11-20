# Git & GitHub Workshop - Setup Script for Windows

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Git & GitHub Workshop - Project Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
Set-Location -Path ".."

Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location -Path "backend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
Set-Location -Path ".."

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Setup Complete! ✓" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables:" -ForegroundColor White
Write-Host "   - Copy backend\.env.example to backend\.env" -ForegroundColor Gray
Write-Host "   - Copy frontend\.env.example to frontend\.env" -ForegroundColor Gray
Write-Host "   - Update the values in both .env files" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start MongoDB:" -ForegroundColor White
Write-Host "   mongod --dbpath C:\data\db" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Run the application:" -ForegroundColor White
Write-Host "   Backend:  cd backend && npm run dev" -ForegroundColor Gray
Write-Host "   Frontend: cd frontend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Access the application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host "   Backend:  http://localhost:4000" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
