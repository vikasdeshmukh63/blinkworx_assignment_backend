# BlinkWorx Server

A robust Node.js/Express.js backend service built with TypeScript, featuring order and product management with PostgreSQL database integration.

## Deployed URL
```https://blinkworx-assignment-backend.onrender.com```

## Features

- **API Endpoints**

    - RESTful endpoints for Orders and Products management
    - Health monitoring endpoints
    - Search functionality for orders

- **Database Integration**

    - PostgreSQL with Sequelize ORM
    - Many-to-many relationship between Orders and Products
    - Transaction management
    - Database models for Orders, Products, and their relationships

- **Security & Reliability**

    - Comprehensive error handling and logging
    - Helmet for HTTP security headers
    - CORS configuration
    - Environment-based security features

- **Development Experience**
    - TypeScript support
    - Code quality tools (ESLint, Prettier)
    - Git hooks with Husky
    - Conventional commits with Commitlint

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Database: PostgreSQL
- ORM: Sequelize
- Logging: Winston
- Security: Helmet
- Code Quality Tools:
    - ESLint
    - Prettier
    - Husky
    - Commitlint
- Development: Nodemon

## Project Structure

```
src/
├── config/     # Configuration files
├── constants/  # Application constants
├── controller/ # Route controllers
├── middleware/ # Express middlewares
├── model/      # Sequelize models
├── router/     # Express routes
├── services/   # Business logic services
├── types/      # TypeScript type definitions
├── utils/      # Utility functions
├── app.ts      # Express app setup
└── server.ts   # Application entry point
```

## API Endpoints

### Health

- `GET /api/v1/health` - Get application health status

### Orders

- `POST /api/v1/order` - Create new order
- `GET /api/v1/order` - Get all orders
- `GET /api/v1/orders/:id` - Get order by ID
- `PUT /api/v1/orders/:id` - Update order
- `DELETE /api/v1/orders/:id` - Delete order
- `GET /api/v1/orders/search` - Search orders

### Products

- `POST /api/v1/product` - Create new product
- `GET /api/v1/product` - Get all products

## Environment Setup

Create `.env.development` or `.env.production` file:

```env
ENV=development
PORT=3000
SERVER_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/database
DATABASE_SSL=false
```

## Getting Started

1. Clone the repository

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    Development:

    ```bash
    npm run dev
    ```

    Production:

    ```bash
    npm run dist  # Build TypeScript
    npm start    # Start production server
    ```

## Code Quality

- `npm run lint` - Run ESLint
- `npm run format:check` - Check code formatting
- `npm run format:fix` - Fix code formatting issues

## Features in Detail

### Database Models

- **Order**: Manages order information with descriptions and creation timestamps
- **Product**: Stores product details including name and description
- **OrderProductMap**: Handles many-to-many relationship between orders and products

### Logging System

- Winston-based comprehensive logging
- Environment-specific log formats
    - Console output for development
    - File logging for production
- Detailed error tracking with stack traces

### Error Handling

- Global error handler middleware
- Standardized error responses
- Database transaction management

### Security Features

- HTTP headers security with Helmet
- Configurable CORS settings
- Environment-based security configurations

## Contributing

1. Follow conventional commits for commit messages
2. Ensure all tests pass
3. Follow the existing code style
4. Update documentation as needed

## Author

Vikas Deshmukh
