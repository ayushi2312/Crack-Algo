# Firebase Setup Guide

## To fix the "Firebase: Error (auth/configuration-not-found)" error:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "crackalgo-app")
4. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" provider
5. Add your authorized domain: `localhost` (for development)

### 3. Get Your Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web app icon (</>)
4. Register your app with a nickname
5. Copy the configuration object

### 4. Update the Configuration

Replace the configuration in `src/firebase/config.ts` with your actual Firebase config:

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

### 5. Alternative: Use Firebase Emulator (for development)

If you want to test without setting up a real Firebase project:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init emulators`
3. Start emulators: `firebase emulators:start`
4. Update config to use emulator:

```typescript
// In config.ts, add this after initializing auth:
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

### 6. Restart the Development Server

After updating the configuration:

```bash
npm run dev
```

The error should be resolved once you have a valid Firebase configuration! 