import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBf4IuaZdejnWb2m4zc9oNyX2QMh0I56OA",
  authDomain: "myrecipes-33ef6.firebaseapp.com",
  projectId: "myrecipes-33ef6",
  storageBucket: "myrecipes-33ef6.appspot.com",
  messagingSenderId: "932600272001",
  appId: "1:932600272001:web:fd0c609c3ba52071efe980"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);