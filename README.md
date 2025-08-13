# 🎵 Spotify Clone - Full Stack Music Streaming Application

## 📋 Deskripsi Project

Spotify Clone adalah aplikasi streaming musik full-stack yang dibangun dengan arsitektur microservices. Project ini mensimulasikan fitur-fitur utama Spotify seperti mendengarkan musik, mengelola album, membuat playlist, dan administrasi konten. Aplikasi ini terdiri dari frontend React dan tiga backend services yang terpisah.

## 🏗️ Arsitektur System

Project ini menggunakan arsitektur **microservices** dengan pemisahan tanggung jawab yang jelas:

```
spotify-clone/
├── frontend/          # React + TypeScript + Vite
├── admin-service/     # Service untuk administrasi album & lagu
├── user-service/      # Service untuk autentikasi & manajemen user
└── song-service/      # Service untuk mengambil data musik
```

## 🚀 Tech Stack

### Frontend
- **React 19.1.0** dengan TypeScript
- **Vite** sebagai build tool
- **React Router DOM** untuk routing
- **TailwindCSS** untuk styling
- **React Icons** untuk ikon
- **React Hot Toast** untuk notifikasi

### Backend Services
- **Node.js** dengan **Express.js**
- **TypeScript** untuk type safety
- **Neon Database** (PostgreSQL) untuk penyimpanan data
- **MongoDB** dengan **Mongoose** untuk user service
- **Redis** untuk caching
- **Cloudinary** untuk penyimpanan media
- **JWT** untuk autentikasi
- **Bcrypt** untuk hashing password
- **Multer** untuk upload file

### Deployment
- **Vercel** untuk hosting semua services
- **Environment variables** untuk konfigurasi

## 📁 Struktur Project Detail

### 1. Frontend (`/frontend`)
Aplikasi React yang menyediakan interface pengguna dengan fitur:

#### 📄 Pages:
- **Home**: Halaman utama menampilkan album dan lagu
- **Login**: Halaman autentikasi pengguna
- **Register**: Halaman registrasi pengguna baru
- **Album**: Halaman detail album dengan daftar lagu
- **PlayList**: Halaman playlist pengguna
- **Admin**: Dashboard admin untuk mengelola konten

#### 🧩 Components:
- **Layout**: Template dasar aplikasi
- **Navbar**: Navigasi utama
- **Sidebar**: Menu samping
- **Player**: Pemutar musik
- **AlbumCard**: Kartu album
- **SongCard**: Kartu lagu
- **PlayListCard**: Kartu playlist
- **Loading**: Komponen loading

#### 🎯 Context:
- **useUserContext**: Manajemen state user dan autentikasi
- **useSongContext**: Manajemen state musik, album, dan playlist

### 2. Admin Service (`/admin-service`)
Microservice untuk administrasi konten dengan fitur:

#### ✨ Fitur Utama:
- ✅ **Upload Album**: Menambah album baru dengan thumbnail
- ✅ **Upload Song**: Menambah lagu ke album tertentu
- ✅ **Delete Album**: Menghapus album dan semua lagunya
- ✅ **Delete Song**: Menghapus lagu individual
- ✅ **Authorization**: Hanya admin yang bisa mengakses

#### 🛠️ Technologies:
- **Cloudinary**: Upload dan storage file media
- **Multer**: Handling multipart/form-data
- **Neon Database**: Penyimpanan metadata album dan lagu
- **Redis**: Caching untuk performa

### 3. User Service (`/user-service`)
Microservice untuk manajemen pengguna dengan fitur:

#### ✨ Fitur Utama:
- ✅ **User Registration**: Registrasi pengguna baru
- ✅ **User Login**: Autentikasi dengan JWT
- ✅ **Password Hashing**: Keamanan password dengan bcrypt
- ✅ **JWT Token**: Session management
- ✅ **User Profile**: Data profil pengguna

#### 🛠️ Technologies:
- **MongoDB + Mongoose**: Database dan ODM
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing

### 4. Song Service (`/song-service`)
Microservice untuk data musik dengan fitur:

#### ✨ Fitur Utama:
- ✅ **Get All Albums**: Mengambil semua album
- ✅ **Get All Songs**: Mengambil semua lagu
- ✅ **Get Album by ID**: Detail album spesifik
- ✅ **Get Songs by Album**: Lagu dalam album tertentu
- ✅ **Redis Caching**: Cache data untuk performa optimal

#### 🛠️ Technologies:
- **Neon Database**: PostgreSQL database
- **Redis**: Caching layer untuk performa

## 🎵 Fitur Aplikasi

### 👤 User Features
- ✅ **Registrasi & Login**: Sistem autentikasi lengkap
- ✅ **Browse Music**: Menjelajahi album dan lagu
- ✅ **Music Player**: Pemutar musik dengan kontrol
- ✅ **Playlist Management**: Membuat dan mengelola playlist
- ✅ **Album View**: Melihat detail album dan lagu

### 👨‍💼 Admin Features
- ✅ **Dashboard Overview**: Statistik album dan lagu
- ✅ **Album Management**: CRUD operations untuk album
- ✅ **Song Management**: CRUD operations untuk lagu
- ✅ **Media Upload**: Upload thumbnail album dan file lagu
- ✅ **Content Moderation**: Mengelola semua konten musik

### 🎛️ Technical Features
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Real-time Updates**: State management yang efisien
- ✅ **Caching**: Redis caching untuk performa
- ✅ **File Upload**: Cloudinary integration
- ✅ **Authentication**: JWT-based security
- ✅ **Error Handling**: Comprehensive error management

## 🔄 Data Flow

1. **User Authentication**: User → User Service → JWT Token
2. **Music Browsing**: Frontend → Song Service → Redis/Database
3. **Admin Operations**: Admin → Admin Service → Database/Cloudinary
4. **Playlist Management**: User → Frontend State → Local Storage

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt untuk keamanan password
- **Role-based Access**: Admin vs User permissions
- **CORS Configuration**: Cross-origin resource sharing
- **Environment Variables**: Secure configuration management

## 📱 UI/UX Features

- **Modern Design**: Clean dan intuitive interface
- **Responsive Layout**: Mobile dan desktop friendly
- **Dark Theme**: Spotify-inspired color scheme
- **Loading States**: User feedback untuk semua operasi
- **Toast Notifications**: Real-time feedback
- **Icon Integration**: React Icons untuk konsistensi

## 🚀 Deployment

Semua services di-deploy ke **Vercel** dengan konfigurasi:
- **Frontend**: Static site deployment
- **Backend Services**: Serverless functions
- **Database**: Neon PostgreSQL & MongoDB Atlas
- **Media Storage**: Cloudinary CDN
- **Caching**: Redis Cloud

## 🔧 Development Setup

```bash
# Install dependencies untuk semua services
pnpm install

# Development mode
pnpm run dev

# Build production
pnpm run build

# Deploy to Vercel
pnpm run deploy
```

## 🎯 Learning Objectives

Project ini mendemonstrasikan:

1. **Microservices Architecture**: Pemisahan concern yang jelas
2. **Full-stack Development**: Frontend dan backend integration
3. **Database Design**: Relational dan NoSQL databases
4. **Authentication & Authorization**: Security best practices
5. **File Upload & Media Handling**: Cloudinary integration
6. **Caching Strategies**: Redis untuk performance optimization
7. **Modern React Patterns**: Hooks, Context, dan TypeScript
8. **DevOps Practices**: CI/CD dengan Vercel

## 🌟 Key Achievements

- ✅ **Scalable Architecture**: Microservices yang dapat dikembangkan secara independen
- ✅ **Performance Optimization**: Redis caching dan efficient data fetching
- ✅ **User Experience**: Responsive design dan real-time feedback
- ✅ **Security**: Comprehensive authentication dan authorization
- ✅ **Code Quality**: TypeScript untuk type safety dan error prevention
- ✅ **Modern Stack**: Latest React 19 dan cutting-edge tools

---

**Project Type**: Full-Stack Music Streaming Application  
**Architecture**: Microservices  
**Development Time**: [Sesuai timeline development Anda]  
**Status**: ✅ Production Ready  
