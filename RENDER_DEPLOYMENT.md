# 🚀 Guide to Deploying Backend on Render (Free Tier)

This guide walks you through deploying the Node.js/Express backend of the Sweet Shop Management System to [Render.com](https://render.com/) using their Free Tier.

## 1. Prerequisites
-   Your code must be pushed to GitHub (Main branch).
-   You need a Render account. [Sign up here](https://dashboard.render.com/register).
-   You need your MongoDB connection string (`MONGO_URI`).

## 2. Create a Web Service
1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click the **"New +"** button and select **"Web Service"**.
3.  Select **"Build and deploy from a Git repository"**.
4.  Connect your GitHub account and select the repository: `Sweet-Shop-Management-System`.

## 3. Configure the Service
Configure the settings as follows to ensure the backend runs correctly from the `Backend` folder:

| Setting | Value | Verification |
| :--- | :--- | :--- |
| **Name** | `sweet-shop-backend` (or similar) | Unique name for your service. |
| **Region** | Singapore (or closest to you) | |
| **Branch** | `main` | Ensure this matches your git branch. |
| **Root Directory** | `Backend` | **CRITICAL**: Tells Render the app is in the subfolder. |
| **Runtime** | Node | |
| **Build Command** | `npm install` | Installs dependencies from `Backend/package.json`. |
| **Start Command** | `npm start` | Runs `node server.js` (we added this script). |
| **Instance Type** | Free | |

## 4. Environment Variables
Scroll down to the **Environment Variables** section. Click "Add Environment Variable" for each of the following:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Optimizes Express for performance. |
| `MONGO_URI` | `mongodb+srv://...` | Your actual MongoDB connection string. |
| `JWT_SECRET` | `your_secret_key` | A secure random string for tokens. |
| `CLIENT_URL` | `https://your-frontend.vercel.app` | The URL where your Frontend will live. |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | (Redundant backup for CORS). |

*Note: For `CLIENT_URL`, if you haven't deployed the frontend yet, you can add it later. For now, you can perform a test deployment, or set it to `*` (not recommended for strict security).*

## 5. Deploy
1.  Click **"Create Web Service"**.
2.  Render will start the build process. You can watch the logs.
3.  **Cold Starts**: On the Free Tier, the service will "sleep" after 15 minutes of inactivity. The first request after sleep may take ~50 seconds to load. This is normal.

## 6. Verification
Once deployed, Render will provide a URL (e.g., `https://sweet-shop-backend.onrender.com`).
-   Visit `https://sweet-shop-backend.onrender.com/` in your browser. You might see "API Running" or your 404 handler.
-   **Copy this URL**. You will need it for your **Frontend** deployment configuration (Environment Variable `VITE_API_BASE_URL`).

## Troubleshooting
-   **Build Failed?** Check the logs. Did you set the `Root Directory` to `Backend`? If not, `npm install` will fail because it can't find `package.json`.
-   **Database Error?** Check your `MONGO_URI` in the Environment Variables. Ensure your IP in MongoDB Atlas is whitelisted (allow usage from anywhere `0.0.0.0/0` for Render).

Happy Deploying! 🚀
