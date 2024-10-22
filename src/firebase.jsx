import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , updatePassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArJL9UiHFc6XrNZo9NZ5HYUJL69qJzj5Y",
  authDomain: "teamtabeer-2676f.firebaseapp.com",
  projectId: "teamtabeer-2676f",
  storageBucket: "teamtabeer-2676f.appspot.com",
  messagingSenderId: "666551254430",
  appId: "1:666551254430:web:e4aa884fba5f426d3c2a8f"
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
  