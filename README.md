# Shopway

A full-stack React and Node.js/Express application for e-commerce.

## Project Structure

```
/backend
  /routes      - API route definitions
  /services    - Business logic and data access
  /utils       - Helper utilities and functions
/frontend
  /src
    /components - Reusable UI components
    /pages      - Page components
    /services   - Service layer for API interaction
    /utils      - Helper functions
```

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Token authentication
- CORS middleware

### Frontend
- React
- React Router
- Modern JavaScript (ES6+)
- Fetch API

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/shopway.git
cd shopway
```

2. Install backend dependencies
```
cd backend
npm install
cp .env.example .env  # Create and configure your .env file
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

#### Development Mode

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd ../frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

#### Production Mode

1. Build the frontend
```
cd frontend
npm run build
```

2. Start the backend server
```
cd ../backend
npm start
```

3. The application will be served from the backend at `http://localhost:5000`

## Features

- Modern React frontend with component-based architecture
- RESTful API backend with Express
- Responsive design
- API service layer for data fetching
- Environment configuration
- Production-ready setup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 