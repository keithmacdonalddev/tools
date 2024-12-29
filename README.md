# Tools Project

A MERN stack application for managing cases and tools.

## Features

-   Case management system
-   Dynamic form fields
-   Search and filter capabilities
-   Responsive design
-   Dark/light theme

## Tech Stack

-   MongoDB
-   Express.js
-   React
-   Node.js
-   Redux Toolkit
-   Tailwind CSS

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB Atlas account
-   npm or yarn

### Installation

1. Clone the repository

```bash
git clone [your-repo-url]
cd tools
```

2. Install dependencies for both client and server

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables

-   Create `.env` file in server directory
-   Create `.env` file in client directory
-   Add necessary environment variables as specified in the documentation

4. Run the application

```bash
# Run server (from server directory)
npm run dev

# Run client (from client directory)
npm run dev
```

## Project Structure

```
tools/
├── client/           # Frontend React application
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
├── server/           # Backend Express application
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```
