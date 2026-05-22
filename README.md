# ShopEase – Full-Stack E-Commerce Platform

A complete e-commerce web application with product browsing, shopping cart, secure checkout (Stripe), order tracking, and admin management.

## Features
- User authentication (register/login) with JWT
- Product catalog with search, category filters, and pagination
- Shopping cart with quantity management (add/update/remove/clear)
- Secure checkout integrated with **Stripe Payment Gateway**
- Order placement & order history tracking
- Admin panel: create, update, delete products; update order statuses
- Email confirmation via **Nodemailer**
- OOP design patterns & unit-tested API endpoints

## Tech Stack
| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React.js, React Router, Axios           |
| Backend  | Node.js, Express.js                     |
| Database | MongoDB (Mongoose)                      |
| Auth     | JWT, bcryptjs                           |
| Payment  | Stripe API                              |
| Email    | Nodemailer (Gmail SMTP)                 |

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB (local or Atlas)
- Stripe account (test keys)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env     # fill in all values
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend: **http://localhost:3000** | API: **http://localhost:5001**

## API Endpoints

### Auth
| Method | Endpoint             | Description   |
|--------|----------------------|---------------|
| POST   | /api/auth/register   | Register      |
| POST   | /api/auth/login      | Login         |

### Products
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/products         | Get all (search/filter)  |
| GET    | /api/products/:id     | Get single product       |
| POST   | /api/products         | Create (admin)           |
| PUT    | /api/products/:id     | Update (admin)           |
| DELETE | /api/products/:id     | Delete (admin)           |

### Cart
| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | /api/cart                 | Get user's cart      |
| POST   | /api/cart/add             | Add item to cart     |
| PUT    | /api/cart/update          | Update item qty      |
| DELETE | /api/cart/remove/:id      | Remove item          |
| DELETE | /api/cart/clear           | Clear cart           |

### Orders
| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| POST   | /api/orders            | Place order           |
| GET    | /api/orders/myorders   | Get my orders         |
| GET    | /api/orders/:id        | Get order by ID       |
| PUT    | /api/orders/:id/status | Update status (admin) |

## Project Structure
```
shopease/
├── backend/
│   ├── models/        # User, Product, Order, Cart schemas
│   ├── routes/        # Auth, Product, Order, Cart routes
│   └── server.js      # Express entry point
└── frontend/
    └── src/
        ├── context/   # AuthContext, CartContext
        ├── pages/     # Home, ProductPage, Cart, Orders, Login, Register
        └── components/# Navbar, ProductCard
```

## Author
**Muhammad Hammad Khan** – [github.com/madiikhan0973-create](https://github.com/madiikhan0973-create)
