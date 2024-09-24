# Application Summary

This application is a full-stack mobile application designed to manage restaurant orders. It includes a client-side interface for users to browse restaurant's menu, register, and place orders, as well as a server-side API to handle the backend logic and database interactions.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (or another supported database)

### Clone the Repository 🚀

Step 1:

- From your command line, first clone the project

Step 2:

```bash
# Clone this repository
$ git clone https://github.com/Haroonabdulrazaq/restaurant-menu-api.git
```

```bash
# Change directory into the repository
$ cd restaurant-menu-api
```

Step 3:

- Open in your favorite Editor

Step 4:

- Install dependencies

```bash
$ npm install
```

Step 5: Note: Later step use concurrently to run both the client & server

```bash
$ npx expo start  -> To run client only
```

### Setting Up the Client

1. Navigate to the client directory:

   ```bash
   cd client2
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the client:
   ```bash
   npx expo start
   ```
   ENV Requirement on Client - SERVER_URL=

### Setting Up the Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Ensure your PostgreSQL server is running.
   - Update the `DATABASE_URL` in `server/.env` with your database connection string.(Check .env.example for reference)
   - Run the Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```

4. Start the server:
   ```bash
   npm run dev -> To run in development environment
   ```

### To run both the client & server

Using concurrently to run both the client & server
Ensure youre in the root of the project and run

```bash
npm run start
```

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user

### Restaurants

- `GET /api/restaurants` - Get a list of all restaurants
- `GET /api/restaurants/:id` - Get details of a specific restaurant

### Orders

- `POST /api/orders` - Place a new order
- `GET /api/orders/:id` - Get details of a specific order

## QR Code Generator

Resturant are pre-seeded into the DB for testing purpose

- USe https://qr.io/
- Select Text
- Enter between the range of 1-4, as Id of restaurant are between this range.

## Important Technologies Used

### Frontend

- React: A JavaScript library for building user interfaces
- React Native: A framework for building native apps using React
- Formik: A form library for React
- Yup: A schema builder for runtime value parsing
- Axios: A promise-based HTTP client for the browser and Node.js
- QRScanner: A QR code scanner for React Native

### Backend

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine
- Express: A minimal and flexible Node.js web application framework
- Prisma: An open-source database toolkit for TypeScript and Node.js
- PostgreSQL: A powerful, open-source object-relational database system

### Others

- JWT: JSON Web Tokens for secure authentication
- ESLint: A tool for identifying and fixing problems in JavaScript code
- Prettier: An opinionated code formatter

## Author

- **Author Name**: [Haroon Abdulrazaq](https://github.com/haroonabdulrazaq)
