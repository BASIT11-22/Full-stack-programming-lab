# Lab 11: MERN Stack Ecommerce Application

This project is a full-stack ecommerce application built with:
- **Frontend**: Next.js (App Router), Tailwind CSS, TypeScript.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).

## Project Structure
- `backend/`: Express server, MongoDB models, and API routes.
- `frontend/`: Next.js application with a modern, responsive UI.

## How to Run

### 1. Prerequisite: MongoDB
Ensure you have MongoDB installed and running locally on `mongodb://127.0.0.1:27017`.

### 2. Setup Backend
1. Open a terminal in `ecommerce-app/backend`.
2. Run `npm install` (if not already done).
3. Run `npm run dev` to start the server with Nodemon.
4. **Seed Data**: After the server is running, visit `http://localhost:5000/api/products/seed` in your browser (or use Postman) to populate the database with initial products.

### 3. Setup Frontend
1. Open a new terminal in `ecommerce-app/frontend`.
2. Run `npm install` (if not already done).
3. Run `npm run dev` to start the Next.js development server.
4. Open `http://localhost:3000` to view the application.

## Key Features
- **Modern UI**: Clean, premium design with glassmorphism and smooth animations.
- **Dynamic Fetching**: Products are fetched directly from the MongoDB database via the Express API.
- **Responsive**: Fully optimized for mobile, tablet, and desktop views.
