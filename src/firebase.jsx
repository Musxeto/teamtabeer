import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , updatePassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDFKsjRpcGl79pcRywT1QjbvZ1sVJBmJO0",

  authDomain: "tabeer-59924.firebaseapp.com",

  projectId: "tabeer-59924",

  storageBucket: "tabeer-59924.firebasestorage.app",

  messagingSenderId: "280333967807",

  appId: "1:280333967807:web:748914c054475b331ec10a"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage };

export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  export const updateUserPassword = async (newPassword) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        alert('Password updated successfully');
      } else {
        throw new Error('No user is logged in');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };
  