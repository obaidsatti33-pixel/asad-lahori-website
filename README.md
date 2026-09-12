# 🍽️ Asad Lahori Nashta Centre

> **Authentic Lahori Breakfast — Delivered with a Modern Digital Experience**

A modern, responsive restaurant website built for **Asad Lahori Nashta Centre**, a local Pakistani breakfast restaurant based in Kalar Chowk, Kahuta.

The platform provides customers with a premium restaurant experience where they can explore the menu, add items to their cart, place pickup or delivery orders, and receive order confirmation.

The project is part of a complete full-stack restaurant management system consisting of:

* Customer Website
* Admin Dashboard
* Backend REST API
* MongoDB Database

---

## 🌐 Live Demo

### Customer Website

**https://website-rho-two-74.vercel.app**

### Admin Panel

**https://admin-tau-five-rql50vj1kw.vercel.app**

### Backend API

**https://asad-lahori-nashta-backend.vercel.app**

---

## ✨ Features

### 👨‍🍳 Customer Experience

* Responsive restaurant landing page
* Premium restaurant-focused UI
* Hero section with restaurant branding
* About section
* Restaurant gallery
* Dynamic menu
* Menu category filtering
* Product availability handling
* Shopping cart
* Quantity management
* Checkout flow
* Pickup and delivery ordering
* Customer order details
* Order confirmation
* WhatsApp/contact integration
* Responsive mobile navigation
* Mobile-friendly checkout experience

### 🛒 Ordering System

Customers can:

1. Browse available menu items
2. Add products to their cart
3. Update quantities
4. Review their order
5. Select pickup or delivery
6. Enter customer/order details
7. Submit the order
8. Receive confirmation after successful submission

Orders are sent to the backend REST API and stored in MongoDB.

---

## 🧩 Full-Stack Architecture

```text
Customer
   │
   ▼
React Customer Website
   │
   │ REST API Requests
   ▼
Express.js Backend
   │
   ▼
MongoDB Atlas
   │
   ▼
Admin Dashboard
```

The customer website communicates with the backend through REST APIs.

The backend handles:

* Menu/product data
* Orders
* Restaurant settings
* Authentication
* Database operations

The admin dashboard consumes the same backend API to manage restaurant operations.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Responsive Design

### Backend

* Node.js
* Express.js
* REST API
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* CORS
* dotenv

### Database

* MongoDB Atlas

### Deployment

* Vercel

### Development Tools

* VS Code
* Git
* GitHub
* Thunder Client

---

## 📁 Project Structure

```text
asad-lahori-website/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar
│   │   ├── Hero
│   │   ├── About
│   │   ├── Gallery
│   │   ├── Menu
│   │   ├── Cart
│   │   ├── Checkout
│   │   ├── Contact
│   │   └── Footer
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔌 Backend Integration

The website communicates with the production backend using REST API endpoints.

### Example API Operations

```text
GET    /api/products
POST   /api/orders
GET    /api/settings
```

The frontend dynamically retrieves menu/product information from the backend rather than relying only on hardcoded menu data.

Orders submitted from the website are sent to the backend and persisted in MongoDB.

---

## 📦 Order Flow

```text
Customer
   │
   ▼
Browse Menu
   │
   ▼
Add Items to Cart
   │
   ▼
Checkout
   │
   ▼
Select Pickup / Delivery
   │
   ▼
Submit Order
   │
   ▼
Backend API
   │
   ▼
MongoDB
   │
   ▼
Admin Dashboard
```

The admin can then process the order through its restaurant management workflow.

---

## 📱 Responsive Design

The website is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile

Special attention was given to:

* Mobile navigation
* Menu cards
* Cart experience
* Checkout layout
* Touch-friendly controls
* Responsive spacing
* Restaurant imagery

---

## 🔐 Reliability & Error Handling

Because this is a real restaurant ordering system, order reliability is a major part of the application.

The frontend handles API failures and unsuccessful order submissions without unnecessarily breaking the customer experience.

The ordering flow is designed around:

* API request validation
* Loading states
* Error handling
* Successful order confirmation
* Backend persistence
* Database-backed order records

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/obaidsatti33-pixel/asad-lahori-website.git
```

### 2. Navigate into the project

```bash
cd asad-lahori-website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🧪 Code Quality

Run ESLint with:

```bash
npm run lint
```

---

## 🔗 Related Repositories

### Backend API

https://github.com/obaidsatti33-pixel/asad-lahori-nashta-backend

### Admin Dashboard

https://github.com/obaidsatti33-pixel/asad-lahori-admin

---

## 🏪 Restaurant Information

**Asad Lahori Nashta Centre**

📍 Kalar Chowk, Kahuta
📞 03235162155

> **Asal Lahori Zaiqa**

Authentic Lahori breakfast prepared with a focus on freshness, traditional taste, and a modern customer experience.

---

## 🎯 Project Goals

This project was developed to demonstrate how a traditional local restaurant can be transformed into a modern digital ordering and management platform.

The goal was not only to build a visually appealing website, but to create a reliable full-stack system connecting:

**Customers → Website → API → Database → Admin Dashboard**

---

## 👨‍💻 Developer

**Obaid ur Rehman**

Full-Stack Web Developer

Built with React, Node.js, Express, MongoDB, and modern web development practices.

---

## 📄 License

This project was developed as a custom restaurant website and management platform for **Asad Lahori Nashta Centre**.
