# Sweet Shop Management System

A full-stack web application for managing a sweet shop, featuring a modern, glassmorphic user interface and a robust administrative backend. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

### Frontend
-   **Modern UI/UX**: Stunning Glassmorphism design with animated backgrounds and smooth transitions using **Framer Motion**.
-   **Interactive Dashboard**: Browse sweets with search and filter capabilities, featuring Skeleton loading states for perceived performance.
-   **User Authentication**: Secure Login and Registration pages with visual feedback.
-   **Shopping Cart**: Fully functional cart with persistent state (Redux Toolkit) and instant visual feedback (Sonner toasts).
-   **Admin Panel**: Dedicated interface for managing inventory (CRUD operations for sweets).
-   **Responsive Design**: optimized for all device sizes.

### Backend
-   **RESTful API**: Structured endpoints for Authentication and Sweet management.
-   **bCrypt & JWT**: Secure password hashing and token-based authentication.
-   **Robust Error Handling**: Centralized error middleware and custom async handlers.
-   **Production Ready**: Configured for deployment on Render (Backend) and Vercel (Frontend).

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Redux Toolkit, Framer Motion, Sonner, Axios, CSS Modules/Variables.
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose), BCrypt, JWT.
-   **Deployment**: Vercel (Frontend), Render (Backend).

## 🤖 My AI Usage

I utilized AI tools (specifically **Antigravity**, powered by Google Gemini models) throughout the development lifecycle to enhance productivity and code quality.

### AI Tools Used
-   **Antigravity (Agentic Coding Assistant)**: Used for code generation, refactoring, and documentation.

### How I Used Them

#### Backend Development
The core backend business logic and architecture were implemented primarily by **myself**. I used AI specifically for:
-   **Error Handling**: Designing custom error middleware and async exception handlers to ensure clean, consistent failure responses.
-   **Testing**: Generating unit tests to validate API endpoints and service logic.
-   **Database Queries**: Assisting with complex MongoDB queries and schema optimization.
-   **Boilerplate**: Setting up the initial server structure and configuration.

#### Frontend Development
For the frontend, I relied more heavily on AI to accelerate UI development and state management setup:
-   **Styling & Design**: I depended on AI to create the **Glassmorphism** visual theme, including the complex CSS for animated backgrounds, gradients, and translucency.
-   **Redux Implementation**: AI generated the boilerplate for Redux Store and Slices (Auth, Cart, Sweets) significantly speeding up state integration.
-   **Component Structure**: I used AI to scaffold key pages (Dashboard, Landing Page) and reusable components (SweetCard, Skeleton loaders), which I then refined.
-   **Animations**: The implementations of `framer-motion` for page entrances and hover effects were generated with AI assistance.

### Reflection
AI significantly impacted my workflow by acting as a specialized "pair programmer." On the backend, it functioned as a QA engineer and expert consultant for specific technical hurdles (like error propagation), allowing me to trust the robustness of my self-written core logic. On the frontend, it acted as a UI designer and rapid prototyper, enabling me to achieve a professional, polished look (the "Sweet Shop" aesthetic) much faster than if I had written every CSS line from scratch. This division of labor allowed me to focus on the application's overall architecture and user journey.

## 📦 Installation & Setup

### Prerequisites
-   Node.js (v14+)
-   MongoDB Instance (Local or Atlas)

### Backend Setup
1.  Navigate to `Backend` folder: `cd Backend`
2.  Install dependencies: `npm install`
3.  Create `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`.
4.  Start server: `npm start` (Production) or `npm run dev` (Dev).

### Frontend Setup
1.  Navigate to `Frontend` folder: `cd Frontend`
2.  Install dependencies: `npm install`
3.  Create `.env` file with `VITE_API_BASE_URL` (points to Backend).
4.  Start dev server: `npm run dev`
5.  Build for production: `npm run build`

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
