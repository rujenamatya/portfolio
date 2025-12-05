# CS601 Term Project - Personal Portfolio Website

## Description
This project is a full-stack personal portfolio website created as part of the CS601 term project. It demonstrates the use of React, TypeScript, Node.js, Express, and MongoDB to build a modern, interactive portfolio with dynamic content management and client-server architecture.

## Features
- **React + TypeScript**: Component-based architecture with type safety for the frontend
- **React Router**: Multi-page navigation with routes for Home, About, Projects, Resume, and Contact
- **Express.js Backend**: RESTful API server handling data operations
- **MongoDB Integration**: Database storage for projects, about information, and contact form submissions
- **Responsive Design**: Mobile-friendly design with modern CSS modules
- **Contact Form**: Functional contact form with validation and database storage
- **Geolocation Feature**: Custom geolocation popup functionality
- **Dynamic Projects Display**: Projects loaded dynamically from MongoDB database
- **Build System**: Vite for fast development and optimized production builds

## File Structure
```
CS601_PROJECT_AMATYA/
├── index.html
├── server.js
├── package.json
├── tsconfig.json
├── mongodb-sample-data.json
├── README.md
├── .gitignore
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── bg.png
│   ├── headshot.png
│   ├── resume.pdf
│   └── GeoPopup.js                
├── src/                           
│   ├── index.tsx                 
│   ├── App.tsx                    
│   ├── global.d.ts                
│   ├── components/                # Reusable React components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/                     # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── services/                  # API service layer
│   │   └── mongoClient.ts
│   └── styles/                    # CSS modules
│       ├── global.css
│       ├── App.module.css
│       ├── Header.module.css
│       ├── Footer.module.css
│       ├── Home.module.css
│       ├── About.module.css
│       ├── Projects.module.css
│       ├── Resume.module.css
│       ├── Contact.module.css
│       ├── shared.module.css
│       └── GeoPopup.css
└── dist/                          
```

## How to Use

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation
1. Clone or download the project files
2. Navigate to the project directory:
   ```bash
   cd CS601_PROJECT_AMATYA
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode
1. Start the backend server:
   ```bash
   npm run server
   ```
2. In a separate terminal, start the frontend development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`

#### Production Build
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run server
   ```

### Database Setup
The project includes sample data in `mongodb-sample-data.json`. Import this data to your MongoDB database to populate:
- `my_projects` collection - Portfolio projects
- `about_me` collection - About page information
- `form_submission` collection - Contact form submissions

## API Endpoints
- `GET /projects` - Fetch all projects from the database
- `GET /about` - Fetch about me information
- `POST /contact` - Submit contact form (requires name, email, message)
- `GET /health` - Server health check

## Technologies Used
### Frontend
- React 18
- TypeScript
- React Router DOM
- Vite (Build tool)
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB with official MongoDB driver
- CORS middleware
- dotenv for environment variables

### Development Tools
- TypeScript compiler
- Vite dev server
- ESLint (implied from project structure)

## Author
Rujen Amatya

## Acknowledgments
This project was created as the term project for CS601. Special thanks to the instructors and peers for their guidance and support throughout the course. The project demonstrates the integration of modern web development technologies including React, TypeScript, Node.js, and MongoDB.
