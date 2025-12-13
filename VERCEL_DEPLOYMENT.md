# 🚀 Guide to Deploying Frontend on Vercel (Free Tier)

This guide walks you through deploying the React/Vite frontend of the Sweet Shop Management System to [Vercel](https://vercel.com/) using their Free Tier.

## 1. Prerequisites
-   Your code must be pushed to GitHub (Main branch).
-   You need a Vercel account. [Sign up here](https://vercel.com/signup).
-   You need your Backend URL from Render (e.g., `https://sweet-shop-backend.onrender.com`).

## 2. Import Project
1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Continue with GitHub"** and choose specific repository: `Sweet-Shop-Management-System`.
4.  Click **"Import"**.

## 3. Configure Project
Configure the "Build & Development Settings" carefully because the frontend is in a subdirectory.

| Setting | Value | Verification |
| :--- | :--- | :--- |
| **Project Name** | `sweet-shop-frontend` | Unique name. |
| **Framework Preset** | `Vite` | Should be detected automatically once you set Root Directory. |
| **Root Directory** | `Frontend` | **CRITICAL**: Click "Edit" and select the `Frontend` folder. |
| **Build Command** | `npm run build` | Default. |
| **Output Directory** | `dist` | Default. |
| **Install Command** | `npm install` | Default. |

## 4. Environment Variables
Expand the **"Environment Variables"** section.

| Key | Value | Notes |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com` | **Trailing slash is optional**. Use the URL provided by Render. |

*Note: This connects your frontend to your deployed backend.*

## 5. Client-Side Routing (SPA)
I have added a `vercel.json` file to the `Frontend` directory. This configuration ensures that refreshing pages like `/dashboard` or `/login` works correctly by redirecting all requests to `index.html`. Vercel will pick this up automatically.

## 6. Deploy
1.  Click **"Deploy"**.
2.  Vercel will build your project. This typically takes ~1 minute.
3.  Once complete, you will see a screenshot of your app and "Congratulations!".

## 7. Final Connection Check
1.  Open your new Vercel URL (e.g., `https://sweet-shop-frontend.vercel.app`).
2.  Wait for your Render Backend to wake up (might take ~50s for the first request).
3.  Try to Register or Login.
4.  **CORS Error?** If you see a CORS error:
    -   Copy your **Vercel URL** (e.g., `https://sweet-shop-frontend.vercel.app`).
    -   Go to **Render Dashboard** -> Your Backend Service -> **Environment Variables**.
    -   Update/Add `CLIENT_URL` to equal your Vercel URL.
    -   Render will restart automatically. Try again after restart.

Happy Deploying! 🚀
