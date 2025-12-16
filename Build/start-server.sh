#!/bin/bash

# Failsafe Startup Script for Isovist Development Server
# This script provides diagnostics and cleanup for server startup issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
DEFAULT_PORT=3000
PROJECT_NAME="Isovist"

echo -e "${CYAN}🚀 ${PROJECT_NAME} Development Server Startup${NC}\n"

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}⚠️  Killing processes on port $port...${NC}"
    
    # Try to kill gracefully first
    lsof -ti:$port | xargs kill -TERM 2>/dev/null || true
    sleep 2
    
    # Force kill if still running
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    sleep 1
    
    if check_port $port; then
        echo -e "${RED}❌ Could not free port $port${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $port is now free${NC}"
        return 0
    fi
}

# Function to cleanup node_modules/.vite if needed
cleanup_vite_cache() {
    if [ -d "node_modules/.vite" ]; then
        echo -e "${YELLOW}🧹 Cleaning Vite cache...${NC}"
        rm -rf node_modules/.vite
    fi
}

# Function to display diagnostics
show_diagnostics() {
    echo -e "${BLUE}📊 System Diagnostics:${NC}"
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "Current directory: $(pwd)"
    echo "Available memory: $(vm_stat | grep "Pages free" | awk '{print $3}' | tr -d '.') pages"
    echo -e "${NC}"
}

# Function to check for common issues
check_common_issues() {
    echo -e "${BLUE}🔍 Checking for common issues...${NC}"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ package.json not found. Are you in the right directory?${NC}"
        exit 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}⚠️  node_modules not found. Running npm install...${NC}"
        npm install
    fi
    
    # Check if example directory exists
    if [ ! -d "example" ]; then
        echo -e "${RED}❌ example directory not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Basic checks passed${NC}\n"
}

# Main startup sequence
main() {
    echo -e "${BLUE}Starting diagnostic checks...${NC}\n"
    
    # Show system info
    show_diagnostics
    
    # Check for common issues
    check_common_issues
    
    # Check if port is in use
    if check_port $DEFAULT_PORT; then
        echo -e "${YELLOW}⚠️  Port $DEFAULT_PORT is already in use${NC}"
        echo -e "${CYAN}Options:${NC}"
        echo "1. Kill existing process and restart"
        echo "2. Use a different port"
        echo "3. Cancel"
        
        read -p "Choose option (1-3): " choice
        
        case $choice in
            1)
                if ! kill_port $DEFAULT_PORT; then
                    echo -e "${RED}❌ Failed to free port. Try manually: pkill -f vite${NC}"
                    exit 1
                fi
                ;;
            2)
                read -p "Enter new port number: " new_port
                DEFAULT_PORT=$new_port
                ;;
            3)
                echo -e "${YELLOW}Cancelled${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid option${NC}"
                exit 1
                ;;
        esac
    fi
    
    # Clean cache if requested
    read -p "Clean Vite cache? (y/N): " clean_cache
    if [[ $clean_cache =~ ^[Yy]$ ]]; then
        cleanup_vite_cache
    fi
    
    echo -e "\n${GREEN}🎯 Starting server on port $DEFAULT_PORT...${NC}\n"
    
    # Try stable server first
    if [ -f "server-stable.mjs" ]; then
        echo -e "${CYAN}Using stable server configuration...${NC}"
        node server-stable.mjs
    elif [ -f "dev-stable.js" ]; then
        echo -e "${CYAN}Using fallback stable configuration...${NC}"
        node dev-stable.js
    else
        echo -e "${CYAN}Using direct Vite...${NC}"
        npm run dev:simple
    fi
}

# Handle script interruption
trap 'echo -e "\n${YELLOW}👋 Startup cancelled${NC}"; exit 130' INT

# Run main function
main "$@"