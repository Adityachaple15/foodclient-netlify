# 🍽️ Swad — Online Food Ordering Platform

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

> A full-stack food ordering web application with secure authentication, real-time order management, and integrated online payments — built end-to-end and deployed on AWS.

🔗 **[Live Demo](https://food-application-8c7ee4.netlify.app/)**

---

## 📌 Features

- 🔐 **JWT Authentication** — Secure login/signup with Spring Security and token-based session management
- 👥 **Role-Based Access Control** — Separate admin and customer dashboards with protected routes
- 🛒 **Real-Time Order Processing** — Add to cart, place orders, and track order status dynamically
- 🍕 **Dynamic Menu Management** — Admins can add, update, and remove menu items in real time
- 💳 **Razorpay Payment Gateway** — Secure end-to-end online payment with webhook-based order confirmation
- ☁️ **AWS EC2 Deployment** — Production deployment with environment-based configuration

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Spring Boot, Spring MVC, Spring Security |
| Auth | JWT (JSON Web Tokens), Spring Security |
| Database | MySQL, Spring Data JPA |
| Payment | Razorpay Payment Gateway |
| Cloud | AWS EC2 |
| Tools | Maven, Git, Postman |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  React.js Frontend               │
│         (Customer UI  |  Admin Dashboard)        │
└────────────────────┬────────────────────────────┘
                     │ REST API (HTTP/JSON)
┌────────────────────▼────────────────────────────┐
│              Spring Boot Backend                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Auth    │  │  Order   │  │    Menu       │  │
│  │ Service  │  │ Service  │  │   Service     │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│         Spring Security + JWT Filter             │
└────────┬────────────────────┬───────────────────┘
         │                    │
┌────────▼──────┐    ┌────────▼──────┐
│   MySQL DB    │    │   Razorpay    │
│ (Spring JPA)  │    │   Gateway     │
└───────────────┘    └───────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Adityachaple15/swad-backend.git
cd swad-backend

# Configure your database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/swad_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Add your JWT secret and Razorpay keys
jwt.secret=your_jwt_secret
razorpay.key.id=your_razorpay_key
razorpay.key.secret=your_razorpay_secret

# Run the application
mvn spring-boot:run
```

### Frontend Setup

```bash
cd swad-frontend
npm install
npm start
```

The app will be running at `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & receive JWT | ❌ |
| GET | `/api/menu` | Fetch all menu items | ❌ |
| POST | `/api/menu` | Add menu item | 🔒 Admin |
| POST | `/api/orders` | Place a new order | 🔒 User |
| GET | `/api/orders/{id}` | Get order details | 🔒 User |
| PUT | `/api/orders/{id}/status` | Update order status | 🔒 Admin |
| POST | `/api/payment/create` | Initiate Razorpay payment | 🔒 User |

---

## 🔒 Security

- Passwords hashed using **BCrypt**
- All protected routes require a valid **JWT Bearer token**
- Role-based access enforced at the controller layer via Spring Security
- Razorpay webhook signature verification on payment confirmation

---

## 📂 Project Structure

```
swad-backend/
├── src/main/java/com/swad/
│   ├── config/          # Security & JWT configuration
│   ├── controller/      # REST controllers
│   ├── service/         # Business logic layer
│   ├── repository/      # Spring Data JPA repositories
│   ├── model/           # Entity classes
│   └── dto/             # Request/Response DTOs
└── src/main/resources/
    └── application.properties
```

---

## 🌐 Deployment

The backend is deployed on **AWS EC2** (Ubuntu) with:
- Application running as a background service via `systemd`
- Environment variables managed via `.env` configuration
- MySQL hosted on the same EC2 instance
- Frontend deployed on **Netlify** with continuous deployment from GitHub

---

## 👨‍💻 Author

**Aditya Chaple**
- 📧 adityachaple02@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/adityachaple/)
- 🌐 [Portfolio](https://portfolio-website-b224d0.netlify.app/)

---

⭐ If you found this project useful, consider giving it a star!
