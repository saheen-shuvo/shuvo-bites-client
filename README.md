# Shuvo Bites 🍽️

Shuvo Bites is a full-stack restaurant management platform where users can browse menus, order food, book tables, pay online, and manage profiles, while admins can control menu items, users, bookings, and orders from a dedicated dashboard.

## 🔗 Live & Repository Links

- **Live Frontend:** https://shuvo-bites.web.app
- **Frontend Repository (this repo):** https://github.com/saheen-shuvo/shuvo-bites-client
- **Backend Repository:** https://github.com/saheen-shuvo/shuvo-bites-server
- **Backend API Base URL:** https://shuvo-bites-server.vercel.app

## 🧩 Full-Stack Project Structure

### Frontend (Client)
- Built with React + Vite
- Handles UI, routing, authentication flow, dashboard pages, cart, booking, reviews, and Stripe payment integration

### Backend (Server)
- Built with Node.js + Express.js
- Provides REST APIs for menu management, users, carts, bookings, orders, JWT auth, and payment-related operations

### Database & Services
- MongoDB for data storage
- Firebase Authentication for user auth
- Firebase Hosting (frontend) + Vercel (backend deployment)

## ✨ Core Features

### User Features
- Browse public menu and food categories
- Add items to cart and place orders
- Book tables online
- Make payments with Stripe
- Add reviews and view payment history

### Admin Features
- Admin dashboard overview
- Add/update/delete menu items
- Manage all users
- Manage orders
- Manage bookings

<img width="1080" height="880" alt="2" src="https://github.com/user-attachments/assets/60701927-6a37-41a8-a558-ba3075676ede" />

<img width="1080" height="1080" alt="3" src="https://github.com/user-attachments/assets/c93a043a-7c16-4fd8-bc34-c4f7c325dc17" />

<img width="1080" height="1080" alt="4" src="https://github.com/user-attachments/assets/e29918fa-339f-4297-9b8b-2f96a1deadba" />

<img width="1080" height="1080" alt="5" src="https://github.com/user-attachments/assets/3c797bfd-3d6e-41f9-b452-cd712fc6fca7" />

<img width="1080" height="1080" alt="6" src="https://github.com/user-attachments/assets/e66f94df-ee47-496e-84c0-6e50be3ca256" />


## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, DaisyUI, TanStack Query, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** Firebase Authentication + JWT
- **Payment:** Stripe

## ⚡ Challenges Faced

- **Real-Time Order Updates:** Implementing a smooth order status update system for both customers and admins.
- **Optimizing Performance:** Ensuring fast loading times for menus and orders.
- **Authentication Management:** Securing user data and managing different user roles efficiently.

## 🔑 Admin Credentials

- **Email:** shuvo@gmail.com
- **Password:** Sa123456

## 🔑 User Credentials

- **Email:** dipto182@gmail.com
- **Password:** Sa123456

## 📞 Contact

For any queries, reach out: **saheenshuvo182@gmail.com**  
or, Whatsapp me at: **+8801751967704**

## ⚙️ Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saheen-shuvo/shuvo-bites-client.git
   cd shuvo-bites-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add:
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_IMAGE_HOSTING_KEY=your_imgbb_key
   VITE_PAYMENT_GATEWAY_PK=your_stripe_publishable_key
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev` → Start development server
- `npm run build` → Build for production
- `npm run lint` → Run ESLint
- `npm run preview` → Preview production build
