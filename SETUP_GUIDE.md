# 🚀 Complete Setup Guide - MERN Task Manager

## Prerequisites
Before starting, make sure you have these installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 📁 Project Structure
\`\`\`
mern-task-manager/
├── frontend/          # React.js application
├── backend/           # Node.js/Express API
└── README.md
\`\`\`

## 🛠️ Step-by-Step Setup

### 1. Clone/Download the Project
\`\`\`bash
# If using Git
git clone <your-repo-url>
cd mern-task-manager

# Or download and extract the ZIP file
\`\`\`

### 2. Backend Setup

#### Navigate to backend folder:
\`\`\`bash
cd backend
\`\`\`

#### Install dependencies:
\`\`\`bash
npm install
\`\`\`

#### Create environment file:
Create a file named `.env` in the backend folder with this content:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=development
PORT=5000
\`\`\`

#### Start MongoDB:
**Windows:**
\`\`\`bash
# Open Command Prompt as Administrator
net start MongoDB
\`\`\`

**macOS:**
\`\`\`bash
brew services start mongodb/brew/mongodb-community
\`\`\`

**Linux:**
\`\`\`bash
sudo systemctl start mongod
\`\`\`

#### Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
Server running on port 5000
MongoDB connected successfully
\`\`\`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend:
\`\`\`bash
cd frontend
\`\`\`

#### Install dependencies:
\`\`\`bash
npm install
\`\`\`

#### Start the frontend:
\`\`\`bash
npm start
\`\`\`

The frontend will open at `http://localhost:3000`

## 🎯 Quick Start Commands

### Terminal 1 (Backend):
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Terminal 2 (Frontend):
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## ✅ Verification
1. Backend running at: `http://localhost:5000`
2. Frontend running at: `http://localhost:3000`
3. You can register a new account and start creating tasks!

## 🐛 Troubleshooting

### MongoDB Connection Issues:
- Make sure MongoDB is running
- Check if port 27017 is available
- Try restarting MongoDB service

### Port Already in Use:
- Backend: Change PORT in `.env` file
- Frontend: It will automatically suggest a different port

### Dependencies Issues:
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
