# E-Shop

Modern full-stack e-commerce application built with the MERN stack, featuring authentication, cart management, wishlist functionality, product browsing, and a responsive user experience.

## Live Demo

Frontend: https://e-shop-wheat.vercel.app

## Features

### Authentication & Authorization

* Secure user registration and login
* JWT-based authentication
* Protected routes
* Persistent user sessions

### Shopping Experience

* Browse products
* Product details page
* Add products to cart
* Update product quantities
* Remove products from cart
* Wishlist management

### User Experience

* Responsive design across devices
* Form validation
* Loading states and skeleton screens
* Toast notifications
* Error handling

### Application Architecture

* RESTful API architecture
* Client-server separation
* MongoDB database integration
* Secure password hashing with bcrypt

## Tech Stack

### Frontend

* React 19
* React Router
* Zustand
* React Hook Form
* Zod
* Axios
* Tailwind CSS v4
* Shadcn UI
* Sonner

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Cookie Parser
* CORS

## Project Structure

```text
root/
├── client/
│   ├── src/
│   └── public/
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── index.js
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

### Run Development Servers

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Future Improvements

* Product search and filtering
* Payment gateway integration
* Order management
* Admin dashboard
* Product reviews and ratings
* Inventory management

## Author

Amar Belkar

* LinkedIn: https://www.linkedin.com/in/amar-belkar-7806101b2/
* Email: [amarhere1122@gmail.com](mailto:amarhere1122@gmail.com)
