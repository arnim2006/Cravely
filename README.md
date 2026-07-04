# 🍔 Cravely 

> **Short-form vertical food reels platform connecting hungry foodies with local partner kitchens.**

Cravely is a premium MERN stack application that leverages social-media-style short-form videos to drive restaurant and food discovery. Instead of scrolling through text reviews, users discover dishes via dynamic video clips, like and bookmark their favorites, read comments, and order directly from local kitchens.

---

## 🚀 Key Engineering & Architecture Highlights

This project was built from scratch to showcase production-grade full-stack engineering patterns:

* **⚡ Viewport Video Optimization**: Utilizes the **HTML5 Viewport IntersectionObserver API** to monitor scrolling feeds. Videos auto-play when visible and automatically pause when scrolled out of view, minimizing CPU and memory consumption.
* **🛡️ Secure Session Management**: Implements JWT authentication stored inside **secure, signed HttpOnly cookies**. This approach prevents Cross-Site Scripting (XSS) and Session Hijacking, keeping user sessions safe compared to standard local storage.
* **📈 Denormalized Mongoose Schemas**: Includes optimized database models with cached counters (like `commentsCount`). By caching counts directly in the parent record, we eliminate the need for heavy Mongo aggregation pipeline joins on high-traffic lists.
* **📊 Dependency-Free Interactive Analytics**: Contains a custom-built Partner Dashboard comparing likes, saves, and comments across recipes. Built using pure React hooks and CSS flex-scaling (completely optimized for React 19 compatibility).
* **☁️ Cloud Asset Pipeline**: Built dynamic multipart form uploads using **Multer (memory storage)** and **ImageKit CDN SDK**, ensuring fast image/video delivery.

---

## 🛠️ Technology Stack

* **Frontend**: React (v19), React Router DOM (v7), Vanilla CSS (Custom Design System, Dark Mode, Glassmorphism).
* **Backend**: Node.js, Express.js, Multer.
* **Database**: MongoDB, Mongoose ODM.
* **Media Cloud**: ImageKit.io CDN.
* **DevOps/Scripts**: Concurrently, Nodemon, BcryptJS.

---

## 📂 Project Directory Structure

```text
Cravely/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Route logic (Auth, Food items, Comments, Analytics)
│   │   ├── models/           # Mongoose schemas (User, Partner, Food, Comments, Likes, Saves)
│   │   ├── middlewares/      # Security filters (HttpOnly cookie JWT authentication check)
│   │   ├── routes/           # REST endpoints
│   │   └── services/         # Third-party cloud integration (ImageKit SDK uploads)
│   ├── seed.js               # Database seeder (cleans old tables and seeds test files)
│   ├── server.js             # Express startup and Mongoose local database connection
│   └── .env.example          # Environment variables template
│
├── Frontend/
│   ├── src/
│   │   ├── components/       # Reusable components (BottomNav, ProtectedRoute, CommentsDrawer)
│   │   ├── context/          # State managers (Global AuthContext)
│   │   ├── pages/            # Core views (Home feed, Saved list, Create Food, Partner Profile, Analytics)
│   │   ├── routes/           # AppRoutes route guard maps
│   │   └── styles/           # Modern theme styling rules (Dark Slate, Glassmorphism, animations)
│   └── index.html            # App viewport entry
│
├── package.json              # Monorepo startup configurations (Concurrently run script)
└── .gitignore                # Excludes secrets, local build cache, and node_modules
```

---

## ⚙️ How to Setup & Run Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **MongoDB** running locally on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/arnim2006/Cravely.git
cd Cravely
```

### 3. Configure Backend Environment
Navigate to the `Backend` directory, create a `.env` file from the template, and fill in your ImageKit API keys:
```bash
cd Backend
cp .env.example .env
```
Open the `.env` file and input your variables:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/cravely
JWT_SECRET=your_jwt_secret_key_here

# ImageKit Configuration (Get these for free at imagekit.io)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id/
```

### 4. Seed the Database
Seed the database with pre-hashed accounts, sample food items, likes, and bookmarks:
```bash
# From the root directory:
npm run seed
```

### 5. Install Dependencies & Run
Start both the Backend (Port 3000) and Frontend development servers simultaneously using a single command from the root directory:
```bash
# Install root, backend, and frontend packages
npm run install-all

# Boot up the servers
npm run dev
```
Open **`http://localhost:5174`** in your browser!

---

## 🔑 Demo Test Credentials

You can skip signup and log in directly using these test accounts:

### 👤 Standard User (Consumer/Foodie)
* **Email**: `user@cravely.com`
* **Password**: `password`
* **Features**: View vertical reels feed, toggle like/bookmarks, view & post/delete comments.

### 🏪 Food Partner (Business/Kitchen Owner)
* **Email**: `partner@cravely.com`
* **Password**: `password`
* **Features**: Upload new dishes (linked to ImageKit), delete owned videos from profile grid, monitor reach inside the custom **Analytics Dashboard**.
