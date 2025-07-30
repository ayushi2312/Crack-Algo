# CrackAlgo - DSA Learning Platform

A modern, interactive platform for learning Data Structures and Algorithms with Firebase authentication and social features.

## Features

- **Firebase Authentication**: Secure Google Sign-In integration
- **Firebase Analytics**: Comprehensive user interaction tracking
- **Friends Wide View**: Horizontal scrollable view showing friends' avatars with level stages
- **Interactive Dashboard**: Progress tracking, leaderboards, and level maps
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient designs with smooth animations

## Firebase Authentication Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add your authorized domain (localhost for development)

### 2. Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web app icon (</>) to add a web app
4. Register your app and copy the configuration

### 3. Configure the App

1. Copy `src/firebase/config.example.ts` to `src/firebase/config.ts`
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase configuration (see above)

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Features Overview

### Authentication
- Google Sign-In integration
- Automatic redirect to dashboard when authenticated
- Sign-out functionality
- User information display

### Analytics Tracking
- Login/logout events
- Dashboard navigation
- Friends view interactions
- User engagement metrics

### Friends Wide View
- Horizontal scrollable layout
- Level stage indicators (Beginner, Intermediate, Advanced, Expert, Master)
- Online status indicators
- Progress bars showing XP within current level
- Hover effects and animations

### Dashboard
- Progress overview with statistics
- Interactive level map
- Friends wide view with toggle
- Leaderboard sidebar
- Profile sidebar
- Quick action buttons

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard with friends view
│   ├── FriendsWideView.tsx    # Friends avatars with level stages
│   ├── LoginPage.tsx          # Firebase authentication UI
│   ├── Navbar.tsx             # Navigation with auth state
│   └── ...                    # Other components
├── contexts/
│   └── AuthContext.tsx        # Firebase auth state management
├── firebase/
│   ├── config.ts              # Firebase configuration
│   └── config.example.ts      # Example configuration
└── ...
```

## Technologies Used

- **React 18** with TypeScript
- **Firebase 10** for authentication
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## Development

The project uses Vite for fast development and building. The Firebase authentication is fully integrated with the React context system, providing a seamless user experience.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development. 