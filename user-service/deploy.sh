#!/bin/bash

# User Service - Vercel Deployment Script
echo "🎵 Deploying Spotify User Service to Vercel..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Error: vercel.json not found. Please run this script from user-service directory.${NC}"
    exit 1
fi

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo -e "${YELLOW}🔐 Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
pnpm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies.${NC}"
    exit 1
fi

# Check environment variables
echo -e "${YELLOW}🔍 Checking environment setup...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Make sure to set environment variables in Vercel Dashboard:${NC}"
    echo "   - MONGO_URI"
    echo "   - JWT_SECRET"
    echo "   - ALLOWED_ORIGINS"
    echo ""
fi

# Build TypeScript (optional check)
echo -e "${YELLOW}🔨 Checking TypeScript compilation...${NC}"
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ TypeScript compilation failed. Please fix the errors before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ TypeScript compilation successful!${NC}"

# Deploy to Vercel
echo ""
echo -e "${YELLOW}🚀 Ready to deploy!${NC}"
echo "Choose deployment type:"
echo "1) Preview deployment (recommended for testing)"
echo "2) Production deployment"
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo -e "${YELLOW}📝 Starting preview deployment...${NC}"
        vercel
        ;;
    2)
        echo -e "${GREEN}🌟 Starting production deployment...${NC}"
        vercel --prod
        ;;
    *)
        echo -e "${YELLOW}❌ Invalid choice. Starting preview deployment...${NC}"
        vercel
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Set environment variables in Vercel Dashboard if not done yet:"
echo "   → Project Settings → Environment Variables"
echo "2. Test your API endpoints:"
echo "   → GET /health"
echo "   → POST /api/v1/user/register"
echo "   → POST /api/v1/user/login"
echo "   → GET /api/v1/user/me"
echo ""
echo -e "${GREEN}🎉 Your Express API is now live on Vercel!${NC}"
