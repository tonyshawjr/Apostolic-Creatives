# Apostolic Creatives

Apostolic Creatives is a platform designed to connect apostolic musicians, sound engineers, and creatives with churches looking to hire their services. This project features a **frontend** (Vue.js) and a **backend** (Node.js + Express) with a database for managing users, jobs, and subscriptions.

---

## Features
- **Admin Dashboard**: Manage creatives, job listings, and verifications.
- **Job Listings**: Creatives can apply for open roles posted by churches.
- **Verification System**: Admin reviews and verifies user submissions.
- **Subscription Management**: Monthly subscription system for creatives and churches.

---

## Technologies
- **Frontend**: Vue.js
- **Backend**: Node.js, Express
- **Database**: MongoDB (or replace with your DB of choice)
- **Styling**: TailwindCSS
- **Task Runner**: Nodemon (backend) and Vue CLI (frontend)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/tonyshawjr/Apostolic-Creatives.git
cd Apostolic-Creatives

### 2. Install Dependencies
You need to install dependencies for both the frontend and backend.
# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend

### 3. Setup Environment Variables
Create an .env file in the backend directory and add the following:

# Backend environment variables
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/apostolic_creatives?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret

Replace <username> and <password> with your MongoDB credentials. You can also modify the PORT or other variables as needed.

### 4. Run the Project
To run both the frontend and backend concurrently:
npm start
Alternatively, you can run the frontend and backend separately:
Backend:
npm run dev --prefix backend
Frontend:
npm run serve --prefix frontend

## Common Issues

### 1. concurrently Not Found
Ensure concurrently is installed:

npm install concurrently --save-dev

### 2. vue-cli-service Not Found
Install Vue CLI in the frontend directory:

npm install --prefix frontend

### 3. Database Connection Issues
Verify the MONGO_URI in the .env file. Ensure MongoDB is running and accessible.

## Contact

For questions or feedback, contact Tony Shaw Jr. at tony.shaw@apostolicsoncall.com.