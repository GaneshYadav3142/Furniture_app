# 🛋️ Furniture Recommendation App

A full-stack web application that helps users discover and purchase furniture with personalized recommendations based on their previous orders.  
Built using **Next.js (App Router)** for the frontend and **Node.js + Express + Prisma** for the backend.

---

## 📂 Project Structure

```
project-root/
│
├── backend/             # Backend (Node.js + Express + Prisma)
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── prisma/          # Prisma schema and migrations
│   ├── prismaClient.js
│   ├── server.js
│   └── package.json
│
├── frontend/            # Frontend (Next.js + Tailwind CSS + Framer Motion)
│   ├── app/             # App Router pages and layouts
│   ├── components/      # UI components
│   ├── libs/            # API utilities and type definitions
│   ├── public/          # Static assets
│   └── package.json
│
└── README.md            # Project documentation
```

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Next/Image optimization**
- **Supabase / REST API Integration**

### ⚡ Backend

- **Node.js + Express.js**
- **Prisma ORM**
- **PostgreSQL (or MySQL)**
- **JWT Authentication**
- **REST API architecture**

---

## 🚀 Features

- 🪑 Browse and view furniture with modern UI
- 🔐 Authentication (Login / Signup via JWT)
- 🛍️ Order furniture with checkout flow
- 🤖 Personalized furniture recommendations
- ✨ Popup preview on image hover (with blur background)
- 📱 Responsive design built with Tailwind

---

## 🧩 Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### 🔑 Environment Variables (`.env`)

```
DATABASE_URL="postgresql://user:password@localhost:5432/furniture_db"
JWT_SECRET="your_secret_key"
PORT=5000
```

### 📡 Backend Routes

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| `POST` | `/api/auth/signup`     | Register new user                |
| `POST` | `/api/auth/login`      | Login user & return JWT token    |
| `GET`  | `/api/furniture`       | Fetch all furniture items        |
| `GET`  | `/api/furniture/:id`   | Fetch a single furniture item    |
| `POST` | `/api/order`           | Place a new order                |
| `GET`  | `/api/orders`          | Get orders for logged-in user    |
| `GET`  | `/api/recommendations` | Get personalized recommendations |

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Make sure the backend server (`http://localhost:4000`) is running before starting the frontend.

### 🔧 Key Components

| Component                   | Description                                 |
| --------------------------- | ------------------------------------------- |
| `FurnitureCard.tsx`         | Displays individual furniture cards         |
| `PopupPreview.tsx`          | Shows popup image preview with blur         |
| `Navbar.tsx`                | Handles login/signup or user avatar display |
| `RecommendationSection.tsx` | Displays recommended furniture for user     |
| `HomePage.tsx`              | Lists all furniture items                   |

---

## 🧠 Recommendation Logic (Backend)

```js
const orders = await prisma.order.findMany({
  where: { userId: req.user.id },
  include: { items: { include: { furniture: true } } },
  orderBy: { createdAt: "desc" },
  take: 5,
});

const categories = [
  ...new Set(
    orders.flatMap((order) =>
      order.items.map((item) => item.furniture.category)
    )
  ),
];

const recommended = await prisma.furniture.findMany({
  where: { category: { in: categories } },
  take: 6,
});
```

---

## 🛠️ Admin Section

The **Admin Panel** is designed to allow authorized users to manage the furniture inventory directly from the web interface.

### 🔐 Access Control & Login

- Only users with an email address ending in **@funistore.com** are granted access to the admin panel.
- Regular users will not see the admin route in navigation and will be redirected to the homepage if they attempt to access it manually.
- To access the admin panel, an authorized user must **log in** using their **Funistore email** through the login modal available in the navbar.
- Once logged in, they can navigate to the **/admin** route to manage furniture.

### 🧩 Admin Features

- The admin dashboard provides a **simple interface** for managing furniture data.
- Admins can:
  - **Add new furniture** by entering details like name, description, price, dimensions, image URL, and category.
  - **Update existing furniture** directly through the same interface.
  - **View a list** of all furniture items displayed in a table format for easy management.

### 💼 Workflow Summary

1. Login with your **Funistore admin email** (e.g., `admin@funistore.com`).
2. Navigate to **/admin** to open the dashboard.
3. Use the form to **add new furniture** or select existing items to **edit**.
4. All changes are immediately reflected in the furniture listing displayed on the main website.

---

## 🧰 Common Scripts

| Command                  | Location | Description                    |
| ------------------------ | -------- | ------------------------------ |
| `npm run dev`            | backend  | Start backend server           |
| `npm run dev`            | frontend | Run Next.js app                |
| `npx prisma migrate dev` | backend  | Apply database migrations      |
| `npx prisma studio`      | backend  | View database records visually |

---

## 🧑‍💻 Author

**Ganesh Yadav**  
_Full Stack Developer (MERN + Prisma + Next.js)_

---

## 🪄 Future Enhancements

- [ ] Product reviews & ratings
- [ ] Wishlist & recently viewed items
- [ ] Payment gateway integration
- [ ] AI-based recommendation improvements

---

## 🧾 License

This project is licensed under the **MIT License**.
