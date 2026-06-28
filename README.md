# 🏡 WanderLust – Airbnb Inspired Vacation Rental Platform

<p align="center">
  <img src="public/images/favicon.png" width="120" alt="WanderLust Logo"/>
</p>

<h3 align="center">
✨ Discover • Share • Explore Amazing Stays Around the World ✨
</h3>

<p align="center">
A modern, full-stack vacation rental platform inspired by Airbnb, built using the MERN ecosystem's backend technologies with secure authentication, interactive maps, image uploads, reviews, advanced search, and category-based filtering.
</p>

---

## 🌐 Live Demo

🔗 **Website:** https://wanderlust-540d.onrender.com

💻 **GitHub:** https://github.com/Penugonda-Niharika/Wanderlust

---

# 📖 About The Project

**WanderLust** is a full-stack vacation rental web application inspired by Airbnb. It allows users to explore beautiful stays, create their own listings, upload images, leave reviews, search destinations, and browse properties by category.

The project follows the **MVC Architecture** and focuses on clean backend development, authentication, database relationships, responsive UI, and deployment.

---

# ✨ Features

## 🔐 Authentication

* Secure User Registration
* Login & Logout
* Session-based Authentication
* Password Hashing using Passport.js

---

## 🛡 Authorization

* Only listing owners can edit or delete their listings.
* Only review authors can delete their reviews.
* Protected routes for authenticated users.

---

## 🏠 Listings

* Create Listing
* View Listings
* Update Listing
* Delete Listing
* Listing Detail Page

---

## 🖼 Image Upload

* Cloudinary Integration
* Multer Middleware
* Image Preview
* Default Image Support

---

## ⭐ Reviews & Ratings

* Add Reviews
* Delete Reviews
* Star Rating System
* Review Validation

---

## 🔍 Smart Search

Search listings using

* Property Title
* Location
* Country

---

## 🏷 Categories

Browse listings by

* 🔥 Trending
* 🛏 Rooms
* 🏙 Iconic Cities
* ⛰ Mountains
* 🏰 Castles
* 🏊 Amazing Pools
* 🏕 Camping
* 🌾 Farms
* ❄ Arctic
* 🛖 Domes
* 🚤 Boats

---

## 🗺 Interactive Maps

* Leaflet.js
* OpenStreetMap
* Location Marker
* Popup Information

---

## 📱 Responsive Design

Optimized for below

* Desktop
* Tablet
* Mobile Devices

---

## ⚡ Flash Messages

Beautiful success and error notifications using **connect-flash**.

---

## ✅ Form Validation

* Client-side Validation
* Server-side Validation
* Joi Validation

---

# 🚀 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Express Session

### Cloud Services

* Cloudinary
* Render
* OpenStreetMap
* Leaflet.js

---

# 🏗 Project Architecture

```
WanderLust
│
├── controllers/
├── init/
├── middleware/
├── models/
├── public/
│   ├── CSS/
│   ├── JS/
│   └── images/
│
├── routes/
├── utils/
├── views/
│
├── app.js
├── cloudConfig.js
├── package.json
└── README.md
```

# 🛠 Installation

### Clone the Repository

```bash
git clone https://github.com/Penugonda-Niharika/Wanderlust.git
```

### Navigate to the Project

```bash
cd Wanderlust
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
MONGO_URL=

SECRET=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=
```

### Start the Server

```bash
npm start
```

Visit

```
http://localhost:8080
```

---

# 👤 Demo Account

### Username

```
demo
```

### Password

```
demo123
```

---

# 📈 Project Statistics

* 👥 5 Demo Users
* 🏡 30+ Listings
* ⭐ 60+ Reviews
* 🏷 11 Categories
* 🌍 Multiple Countries
* 📍 Interactive Maps
* ☁ Cloud Image Storage

---

# 🎯 What I Learned

During the development of WanderLust, I gained practical experience with:

* MVC Architecture
* RESTful APIs
* Authentication & Authorization
* MongoDB Relationships
* Cloudinary Integration
* Session Management
* Responsive UI Design
* Form Validation
* Deployment on Render
* MongoDB Atlas
* Git & GitHub Workflow

---

# 🚀 Future Enhancements

* ❤️ Wishlist Feature
* 📅 Booking System
* 💳 Online Payments
* 📆 Availability Calendar
* 🖼 Multiple Images per Listing
* 👤 User Profiles
* 🔔 Email Notifications
* 🌙 Dark Mode
* 📊 Admin Dashboard
* 🤖 AI-based Property Recommendations

---

# 🤝 Connect With Me

### GitHub

https://github.com/Penugonda-Niharika

### LinkedIn

https://www.linkedin.com/in/penugonda-niharika-b69814366/

---

# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It motivates me to build more open-source projects and continue learning.

---

<p align="center">
Made with ❤️ by <b>Penugonda Niharika</b>
</p>
