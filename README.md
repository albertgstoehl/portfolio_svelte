# Portfolio Application

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2e3dbc8-822e-4756-9634-9ae0db3e4105/deploy-status)](https://app.netlify.com/sites/ags-portfolio/deploys)

This project is a personal portfolio web application designed to showcase projects, provide a downloadable CV, and allow visitors to send messages via a contact form. It features an admin dashboard for managing projects and uses advanced technologies like SvelteKit, MongoDB, and GitHub OAuth.

## **Features**

- **Intro Page:** Displays technologies dynamically with a typewriter effect and WebGL-rendered 3D laptop model.
- **Projects Overview:** List of projects with filtering based on technologies.
- **Project Management:** Create, edit, and delete projects (admin-only).
- **CV Download:** Fetches the latest CV from a LaTeX-based repository.
- **Contact Form:** Send messages via Netlify integration.
- **GitHub OAuth Authentication:** Enables admin login.

## **Getting Started**

### **Requirements**

- Node.js (v16+ recommended)
- MongoDB instance
- GitHub account for OAuth

### **Environment Variables**

The project requires the following `.env` file configuration for proper functionality:

| Variable                 | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `MONGODB_URI`          | Connection string for the MongoDB database.                                  |
| `MONGODB_DBNAME`       | Name of the MongoDB database.                                                |
| `CV_LATEX_REPO_URL`    | URL of the LaTeX-based repository for generating CV PDFs.                    |
| `CV_LATEX_REPO_TOKEN`  | Personal access token for accessing the CV repository.                       |
| `GITHUB_CLIENT_ID`     | Client ID for GitHub OAuth authentication.                                   |
| `GITHUB_CLIENT_SECRET` | Client secret for GitHub OAuth authentication.                               |
| `AUTH_SECRET`          | Secret key used for authentication and session management.                   |
| `ADMIN_USER_ID`        | GitHub user ID of the admin account (used for admin privilege verification). |
