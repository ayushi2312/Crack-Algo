import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpGax1qWa3ViJt11HFkFu2f-KYVykRFm4",
  authDomain: "crash-algo.firebaseapp.com",
  projectId: "crash-algo",
  storageBucket: "crash-algo.firebasestorage.app",
  messagingSenderId: "465100775314",
  appId: "1:465100775314:web:a56b0da7dc08c501b26b4b",
  measurementId: "G-ZS3ZW7JXPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics
const analytics = getAnalytics(app);

// Export analytics for use in other components
export { analytics };

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log('Firebase signInWithEmail called with:', { email, passwordLength: password.length });
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('Firebase signInWithEmail successful:', result.user);
    return result.user;
  } catch (error: any) {
    console.error('Error signing in with email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to sign in';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled';
    } else {
      errorMessage = error.message || 'An error occurred during sign in';
    }
    
    throw new Error(errorMessage);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    console.log('Firebase signUpWithEmail called with:', { email, passwordLength: password.length });
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Firebase signUpWithEmail successful:', result.user);
    return result.user;
  } catch (error: any) {
    console.error('Error signing up with email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create account';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password';
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMessage = 'Email/password accounts are not enabled. Please contact support';
    } else {
      errorMessage = error.message || 'An error occurred during account creation';
    }
    
    throw new Error(errorMessage);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default app; 