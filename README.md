# MERN Stack Task Management Application

A complete task management application built with MongoDB, Express.js, React.js, and Node.js featuring authentication, CRUD operations, and a beautiful responsive UI.

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### Task Management
- Create, read, update, and delete tasks
- Task properties: title, description, due date, priority, status
- Mark tasks as completed
- Filter tasks by status (All/Pending/In Progress/Completed)
- Search tasks by title
- Sort tasks by date, priority, or title

### User Experience
- Responsive design with Tailwind CSS
- Toast notifications for all actions
- Loading indicators
- Smooth animations
- Mobile-friendly interface

### Technical Features
- RESTful API design
- MongoDB with Mongoose ODM
- Input validation and error handling
- MVC architecture
- Environment variables for configuration

## Project Structure

\`\`\`
├── frontend/                 # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React Context for state management
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                  # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── README.md
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file with the following variables:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
\`\`\`

4. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the frontend development server:
\`\`\`bash
npm start
\`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Environment Variables

### Backend (.env)
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
\`\`\`

## Deployment

### Backend Deployment (Render/Railway/Vercel)

1. Create a new service on your chosen platform
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI` (use MongoDB Atlas for production)
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy the backend folder

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
\`\`\`bash
cd frontend
npm run build
\`\`\`

2. Deploy the `build` folder to your chosen platform
3. Update the API base URL in the frontend to point to your deployed backend

## Technologies Used

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS for cross-origin requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
