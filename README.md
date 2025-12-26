# 🍔 Cravely — Video-Based Food Discovery Platform

Cravely is a **full-stack MERN application** that reimagines how users discover food on delivery platforms by introducing a **short-video (reels) based experience** for restaurants and food partners.

Unlike traditional food delivery apps that rely mainly on static images and menus, Cravely allows restaurants to **showcase food items through engaging videos**, helping users make better ordering decisions while enabling restaurants to connect more effectively with customers.

---

## 🚀 Key Highlights
- Instagram-like **vertical food reels**
- Role-based authentication (**Users & Food Partners**)
- Secure backend with access control
- Real-time engagement metrics (likes & saves)
- Mobile-first & responsive UI
- Scalable MERN architecture

---

## 🎯 Problem Statement
Most food delivery platforms depend on static images, which often fail to convey:
- Real food appeal
- Portion size
- Presentation quality

This creates a gap between customer expectations and reality, while also limiting how restaurants promote their dishes.

---

## 💡 Solution
Cravely bridges this gap by integrating a **short-video discovery system** into food delivery platforms, allowing restaurants to visually market their food while giving users a more immersive browsing experience before ordering.

---

## 🧩 Features & Functionality

### 👤 User Features
- User **registration & login**
- Scroll through food reels (infinite vertical feed)
- ❤️ Like food videos
- 🔖 Save reels for later
- View all **saved reels** in user profile
- Navigate to **restaurant profile** from any reel
- View real-time **like & save counts** on reels

---

### 🏪 Food Partner (Restaurant) Features
- Secure **food partner authentication**
- Role-based access control
- Only food partners can **post reels**
- Upload reels with:
  - Title
  - Description
  - Video content
- View engagement metrics:
  - Number of likes
  - Number of saves
- Browse reels like a normal user

---

### 🔐 Authentication & Authorization
- Separate login & register flows for:
  - Users
  - Food Partners
- Protected routes
- Backend-enforced role validation
- Restricted actions based on user roles

---

## 📱 Reels Engagement System
Each reel displays:
- ❤️ Total likes count
- 🔖 Total saves count

These engagement metrics are visible to all users, increasing transparency and trust.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Responsive & mobile-first UI
- Component-based architecture

### Backend
- Node.js
- Express.js
- RESTful APIs
- Secure authentication logic

### Database
- MongoDB
- Structured schemas for users, food partners, reels & engagement

### Media Storage
- ImageKit
  - Optimized image & video delivery
  - Scalable cloud storage

---


## 📸 Application Walkthrough

### 🔐 Authentication (User & Food Partner)
Users and food partners have separate login and registration flows with role-based access control.

---

#### 👤 User Registration
<img width="410" height="908" alt="User Registration" src="https://github.com/user-attachments/assets/98054812-7873-4b8f-85b8-4826a35913f4" />

---

#### 👤 User Login
<img width="413" height="914" alt="User Login" src="https://github.com/user-attachments/assets/5d027946-a073-4caf-8be5-732e7a367154" />

---

#### 🏪 Food Partner Registration
<img width="409" height="910" alt="Food Partner Registration" src="https://github.com/user-attachments/assets/9fc43893-bfbf-4cbd-803a-aa31d1fe3a48" />

---

#### 🏪 Food Partner Login
<img width="409" height="909" alt="Food Partner Login" src="https://github.com/user-attachments/assets/e9a3559d-1378-4281-b65e-9d4f8d6da374" />

---

### 🏠 Home Reels Feed
Users can scroll through food reels in an infinite vertical feed, similar to Instagram Reels.

<img width="412" height="913" alt="image" src="https://github.com/user-attachments/assets/3a9858d4-db51-4517-bb85-61e3637c6846" />

---

### 🔖 Saved Reels
Users can view all the reels they have saved in their profile.

<img width="411" height="911" alt="image" src="https://github.com/user-attachments/assets/1c6d5e94-12a1-423c-be28-b01757667e22" />


---

### 📤 Food Partner Reel Upload
Food partners can upload reels with a title, description, and video.

<img width="410" height="914" alt="image" src="https://github.com/user-attachments/assets/67055ec9-68b6-49f7-ab11-fcd04b40db0a" />


---

### 🏪 Restaurant Profile View
Users can visit the restaurant profile directly from a reel.

<img width="410" height="906" alt="image" src="https://github.com/user-attachments/assets/be11a0e8-9397-4086-8ff6-362de6ea0c9b" />


---

## 🔮 Future Enhancements
- Food ordering integration
- Comments on reels
- Follow restaurants
- Analytics dashboard for food partners
- Personalized recommendations
