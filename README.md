# MERN Stack To-Do List Application

This is a simple MERN stack application that allows users to create and manage their personal to-do lists. The application includes user authentication and a responsive user interface.

**Deployed Website**
https://todo-lists-mern-stack-m7az7plsi-sureshs-projects-dac78f80.vercel.app/

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete to-do lists
- Responsive and user-friendly interface
- Secure and robust error handling

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Server: Render, Frontend: Vercel

## Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sureshp509/Todo-Lists-MernStack.git
   cd Todo-Lists-MernStack

2. **Set Up Backend**  

Navigate to the backend directory, install dependencies, and create a .env file with the required environment variables.  
    cd backend  
    npm install  

3. **Set Up Frontend**

Navigate to the frontend directory, install dependencies, and build the React app.  
cd ../frontend  
npm install  
npm run build  

4. **Run the Application Locally**

Start the backend server:  
cd ../backend  
npm start  

The backend server should be running on http://localhost:5000.  

To test the frontend locally, you might run the development server:  
cd ../frontend  
npm start  

**Usage**
Register: Navigate to /register to create a new account.  
Login: Navigate to /login to sign in to your account.  
Dashboard: After logging in, you will be redirected to /dashboard, where you can manage your to-do lists.  

