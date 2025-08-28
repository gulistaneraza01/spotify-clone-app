# 🎵 Spotify App

A full-stack music streaming application built with React, Node.js, and Express. This project provides a modern music listening experience with user authentication, playlist management, and admin capabilities.

## ✨ Features

### 🎧 User Features

- **User Authentication**: Secure login and registration system
- **Music Streaming**: Listen to songs with a custom audio player
- **Playlist Management**: Create and manage personal playlists
- **Album Browsing**: Explore music by albums
- **Responsive Design**: Modern UI that works on all devices

### 🔐 Admin Features

- **Dashboard**: Comprehensive admin panel for content management
- **Content Upload**: Upload songs, albums, and playlists
- **User Management**: Monitor and manage user accounts
- **Media Management**: Handle file uploads with Cloudinary integration

## 🏗️ Architecture

This project follows a microservices architecture with separate services for different functionalities:

### Frontend (Client)

- **React 19** with modern hooks and context API
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend Services

#### 🔐 Authentication Service (`/server/auth`)

- User registration and login
- JWT token management
- Password encryption with bcrypt
- MongoDB integration with Mongoose

#### 🎵 Song Service (`/server/song`)

- Music streaming and management
- Redis caching for performance
- Neon database integration
- Song metadata handling

#### 👨‍💼 Admin Service (`/server/admin`)

- Administrative functions
- File upload handling with Multer
- Cloudinary integration for media storage
- Content management APIs

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- MongoDB database
- Redis server (optional, for caching)
- Cloudinary account (for admin features)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd spotifyApp
   ```

2. **Install frontend dependencies**

   ```bash
   cd client
   pnpm install
   ```

3. **Install backend dependencies**

   ```bash
   # Authentication service
   cd ../server/auth
   pnpm install

   # Song service
   cd ../song
   pnpm install

   # Admin service
   cd ../admin
   pnpm install
   ```

### Environment Setup

Create `.env` files in each service directory:

#### Auth Service (`/server/auth/.env`)

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Song Service (`/server/song/.env`)

```env
PORT=5002
NEON_DATABASE_URL=your_neon_database_url
REDIS_URL=your_redis_url
```

#### Admin Service (`/server/admin/.env`)

```env
PORT=5003
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Application

1. **Start the backend services**

   ```bash
   # Terminal 1 - Auth service
   cd server/auth
   pnpm dev

   # Terminal 2 - Song service
   cd server/song
   pnpm dev

   # Terminal 3 - Admin service
   cd server/admin
   pnpm dev
   ```

2. **Start the frontend**

   ```bash
   cd client
   pnpm dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

## 📁 Project Structure

```
spotifyApp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Application pages
│   │   └── assets/        # Static assets
│   └── package.json
├── server/
│   ├── auth/              # Authentication service
│   ├── song/              # Music streaming service
│   └── admin/             # Admin management service
└── README.md
```

## 🛠️ Available Scripts

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Backend Services

- `pnpm dev` - Start development server with nodemon
- `pnpm start` - Start production server

## 🔧 Technologies Used

### Frontend

- **React 19** - Modern React with concurrent features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Redis** - In-memory data store
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud media management
- **Multer** - File upload middleware

## 🌟 Key Features Implementation

### Audio Player

- Custom audio controls with play/pause, skip, and volume
- Progress bar with seek functionality
- Responsive design for mobile and desktop

### State Management

- React Context API for global state
- User authentication state
- Currently playing song state

### File Upload

- Secure file upload with validation
- Cloudinary integration for media storage
- Support for various audio formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Spotify for inspiration
- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first approach
