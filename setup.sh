#!/bin/bash

# Git & GitHub Workshop - Setup Script for Linux/Mac

echo "================================================"
echo "Git & GitHub Workshop - Project Setup"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Node.js installation
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if command -v node &> /dev/null
then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js is installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js is not installed!${NC}"
    echo -e "${RED}  Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check npm installation
echo -e "${YELLOW}Checking npm installation...${NC}"
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm is installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm is not installed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
echo ""

# Install frontend dependencies
echo -e "${CYAN}Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Frontend installation failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
cd ..

echo ""

# Install backend dependencies
echo -e "${CYAN}Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Backend installation failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
cd ..

echo ""
echo "================================================"
echo -e "${GREEN}Setup Complete! ✓${NC}"
echo "================================================"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Configure environment variables:"
echo "   - cp backend/.env.example backend/.env"
echo "   - cp frontend/.env.example frontend/.env"
echo "   - Update the values in both .env files"
echo ""
echo "2. Start MongoDB:"
echo "   mongod --dbpath /usr/local/var/mongodb"
echo ""
echo "3. Run the application:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo ""
echo "4. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo ""
echo -e "${CYAN}For detailed instructions, see SETUP_GUIDE.md${NC}"
echo ""
