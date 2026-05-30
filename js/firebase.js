import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBNBbMryXpXCLF9EwPfnzCjTi0Dr6AXLCc",

  authDomain: "personal-dashboard-ebe93.firebaseapp.com",

  projectId: "personal-dashboard-ebe93",

  storageBucket: "personal-dashboard-ebe93.firebasestorage.app",

  messagingSenderId: "644722350800",

  appId: "1:644722350800:web:00e3572ececd0497b09cd5"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);