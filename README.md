# Product Management API with Contentful Integration

A robust NestJS-based REST API for product management with Contentful CMS integration, featuring authentication, reporting, and automated data synchronization.

## 🚀 Features

- **Product Management**: Full CRUD operations with advanced filtering and pagination
- **User Authentication**: JWT-based authentication with role-based access control
- **Contentful Integration**: Automated synchronization with Contentful CMS
- **Advanced Reporting**: Analytics and insights with custom report generation
- **Real-time Sync**: Scheduled tasks for data synchronization
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Management**: PostgreSQL with TypeORM and automated migrations
- **Comprehensive Testing**: Unit and integration tests with Jest
- **Docker Support**: Containerized development and deployment

## 🛠 Tech Stack

### Core Technologies
- **Framework**: NestJS 10.x (Node.js, TypeScript)
- **Database**: PostgreSQL 15 with TypeORM
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest with comprehensive mocking

### Integrations
- **CMS**: Contentful API integration
- **Validation**: class-validator and class-transformer
- **Security**: bcrypt for password hashing
- **Scheduling**: @nestjs/schedule for cron jobs

### Development Tools
- **Containerization**: Docker & Docker Compose
- **Code Quality**: ESLint, Prettier
- **Type Safety**: TypeScript strict mode
- **Environment**: dotenv configuration

## 📋 Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **Docker**: >= 20.x (optional but recommended)
- **PostgreSQL**: >= 15.x (if not using Docker)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd api-contentful
npm install
```

### 2. Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Configure your environment variables (see Configuration section below)
```

### 3. Start with Docker (Recommended)
```bash
# Start all services (API + Database)
npm run docker:up

# Or start only database
npm run db:up
npm run start:dev
```

### 4. Alternative: Local Development
```bash
# Ensure PostgreSQL is running locally
npm run start:dev
```

### 5. Initial Data Setup

After starting the application, you need to populate the database with initial data from Contentful:

#### Trigger Initial Data Sync (No Authentication Required)
```bash
# Trigger manual sync to populate database with Contentful data
curl -X POST http://localhost:3000/contentful/manual-sync
```

**Expected Response:**
```json
{
  "message": "Sync completed successfully",
  "productsProcessed": 15,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Alternative Methods:**

**Using Swagger UI:**
1. Navigate to `http://localhost:3000/api/docs`
2. Find the `POST /contentful/manual-sync` endpoint under "Contentful" section
3. Click "Try it out" and "Execute"

**Using Postman or similar:**
- **Method**: POST
- **URL**: `http://localhost:3000/contentful/manual-sync`
- **Headers**: Content-Type: application/json (no authentication needed)

**Note**: The manual sync endpoint is public and doesn't require authentication to make initial setup easier. Once you have data, you can use the authenticated endpoints to manage products.

The API will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=products_db

# Application Configuration
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Contentful Configuration (Optional)
CONTENTFUL_SPACE_ID=your-contentful-space-id
CONTENTFUL_ACCESS_TOKEN=your-contentful-access-token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CONTENT_TYPE=product
```

### Default User Account

A default user is automatically created on startup:
- **Email**: `test@test.com`
- **Password**: `test`
- **Role**: Admin

## 📚 API Documentation

### Swagger UI
Interactive API documentation is available at:
- **Development**: `http://localhost:3000/api/docs`
- **JSON Spec**: `http://localhost:3000/api/docs-json`

### API Endpoints Overview

| Module | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | `POST /auth/login` | User authentication |
| **Users** | `GET /users` | List users with pagination |
| **Users** | `POST /users` | Create new user |
| **Users** | `GET /users/:id` | Get user by ID |
| **Products** | `GET /products` | List products with filtering |
| **Products** | `GET /products/:id` | Get product details |
| **Products** | `DELETE /products/:id` | Soft delete product |
| **Contentful** | `GET /contentful/sync` | Authenticated sync trigger |
| **Contentful** | `POST /contentful/manual-sync` | **Public** - Initial data sync |
| **Reports** | `GET /reports/deleted-products-percentage` | Deletion analytics |
| **Reports** | `GET /reports/category-distribution` | Category breakdown |
| **Reports** | `GET /reports/custom` | Custom report generation |

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## 🏗 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # JWT guards and strategies
│   ├── dto/             # Auth DTOs
│   └── strategies/      # Passport strategies
├── users/               # User management
│   ├── entities/        # User entity
│   ├── dto/             # User DTOs
│   └── users.repository.ts
├── products/            # Product management
│   ├── entities/        # Product entity
│   ├── dto/             # Product DTOs
│   └── products.repository.ts
├── contentful/          # Contentful integration
│   └── contentful.service.ts
├── reports/             # Analytics and reporting
│   ├── dto/             # Report DTOs
│   └── reports.repository.ts
├── commons/             # Shared utilities
│   ├── dto/             # Common DTOs (pagination, etc.)
│   └── entities/        # Base entities
├── helpers/             # Utility functions
│   ├── decorators/      # Custom decorators
│   └── enums/           # Application enums
└── seed/                # Database seeding
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

### Test Coverage Goals
- **Unit Tests**: > 80% coverage for services and controllers
- **Integration Tests**: Critical business flows
- **E2E Tests**: Complete user journeys

## 🐳 Docker Development

### Available Commands
```bash
# Full stack (API + Database)
npm run docker:up
npm run docker:down

# Database only
npm run db:up
npm run db:down

# View logs
npm run docker:logs
```

### Docker Services
- **API**: NestJS application on port 3000
- **PostgreSQL**: Database on port 5432
- **Volumes**: Persistent data storage

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Use strong JWT secrets
4. Set up proper logging
5. Configure CORS for your domain

### Health Checks
The application includes health check endpoints for monitoring:
- Database connectivity
- External service availability

## 🔄 Contentful Synchronization

### Initial Setup (First Time)
For new installations, you **must** run the manual sync to populate your database:

```bash
# No authentication required - perfect for setup scripts
curl -X POST http://localhost:3000/contentful/manual-sync
```

This endpoint:
- ✅ **Public access** - No JWT token required
- ✅ **Safe to run multiple times** - Idempotent operation
- ✅ **Returns detailed feedback** - Shows number of products processed
- ✅ **Perfect for CI/CD** - Can be automated in deployment scripts

### Automatic Sync
- **Schedule**: Every hour (configurable via cron)
- **Process**: Fetches products from Contentful and updates local database
- **Conflict Resolution**: Last-modified wins strategy
- **Requires**: Valid Contentful API credentials in environment

### Manual Sync (Authenticated)
```bash
# Requires JWT token - for ongoing management
GET /contentful/sync
```

### Manual Sync (Public)
```bash
# No authentication - for initial setup and emergencies
POST /contentful/manual-sync
```

## 📊 Monitoring and Logging

### Application Logging
- **Development**: Console output with timestamps
- **Production**: Structured logging (JSON format)
- **Levels**: Error, Warn, Info, Debug

### Performance Monitoring
- Request/response timing
- Database query performance
- External API response times

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Ensure code quality checks pass
4. Submit pull request with description

### Code Quality Standards
```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run build
```

### Commit Guidelines
- Use conventional commit format
- Include tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the [UNLICENSED](LICENSE) - see the LICENSE file for details.

## 🆘 Support

### Common Issues

#### Database Connection
- **Problem**: `ECONNREFUSED` or database connection errors
- **Solution**: Ensure PostgreSQL is running and credentials in `.env` are correct
- **Docker**: Run `npm run db:up` to start PostgreSQL container

#### JWT Authentication Errors
- **Problem**: `secretOrPrivateKey must have a value`
- **Solution**: Verify `JWT_SECRET` is set in your `.env` file
- **Quick Fix**: Copy from `.env.example` and restart the application

#### Empty Database / No Products
- **Problem**: API returns empty arrays for products
- **Solution**: Run the initial data sync:
  ```bash
  curl -X POST http://localhost:3000/contentful/manual-sync
  ```
- **Verification**: Check response shows `productsProcessed > 0`

#### Contentful Sync Issues
- **Problem**: Manual sync fails or returns errors
- **Solution**: Check Contentful API credentials in environment:
  - `CONTENTFUL_SPACE_ID`
  - `CONTENTFUL_ACCESS_TOKEN`  
  - `CONTENTFUL_ENVIRONMENT`
  - `CONTENTFUL_CONTENT_TYPE`
- **Testing**: Verify credentials work in Contentful's API explorer

#### Port Already in Use
- **Problem**: `EADDRINUSE :::3000`
- **Solution**: Kill existing process or change port:
  ```bash
  lsof -ti:3000 | xargs kill -9
  # Or set PORT=3001 in .env
  ```

### Getting Help
- Check the [Issues](issues) section
- Review API documentation at `/api/docs`
- Ensure all environment variables are configured

---

**Built with ❤️ by Harys Vizcaino**