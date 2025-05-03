// Import modul dari Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Konfigurasi Firebase milikmu
const firebaseConfig = {
  apiKey: "AIzaSyBhuMXs-LfWGGV44GUAmwe4xZ1NnBQ6Mt0",
  authDomain: "todolist-89067.firebaseapp.com",
  projectId: "todolist-89067",
  storageBucket: "todolist-89067.appspot.com",
  messagingSenderId: "692613702446",
  appId: "1:692613702446:web:6b932720e0ac4ba332d0bf"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor Firestore
export const db = getFirestore(app);