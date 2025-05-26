# Deployment Guide

## Backend Deployment (Vercel)

1. **Prepare the backend:**
   - Ensure `vercel.json` is in the backend root
   - Environment variables are set in Vercel dashboard

2. **Deploy to Vercel:**
   \`\`\`bash
   cd backend
   vercel --prod
   \`\`\`

3. **Set Environment Variables in Vercel:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: production

## Frontend Deployment (Vercel)

1. **Update API base URL:**
   - In `frontend/src/utils/api.js`, update the production baseURL to your deployed backend URL

2. **Deploy to Vercel:**
   \`\`\`bash
   cd frontend
   npm run build
   vercel --prod
   \`\`\`

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account:**
   - Go to https://cloud.mongodb.com/
   - Create a new cluster

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Whitelist IP Addresses:**
   - Go to Network Access
   - Add IP Address: 0.0.0.0/0 (allow from anywhere)

## Environment Variables

### Backend (.env for local development)
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=development
PORT=5000
\`\`\`

### Production Environment Variables (Vercel)
- Set the same variables in your Vercel project settings
- Make sure `NODE_ENV=production`

## Testing the Deployment

1. **Test Backend API:**
   \`\`\`bash
   curl https://your-backend-url.vercel.app/api/health
   \`\`\`

2. **Test Frontend:**
   - Visit your deployed frontend URL
   - Try registering a new user
   - Create and manage tasks

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure your backend CORS is configured to allow your frontend domain

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings

3. **Authentication Issues:**
   - Verify JWT_SECRET is set correctly
   - Check token expiration settings

4. **API Not Found:**
   - Ensure `vercel.json` routes are configured correctly
   - Check that all API endpoints are working locally first
