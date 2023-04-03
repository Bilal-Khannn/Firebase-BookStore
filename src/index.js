import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5iHfJugsoZekEOlvl_2OcoXE0pGIhOU4",
  authDomain: "fir-tutorial-2d6f7.firebaseapp.com",
  projectId: "fir-tutorial-2d6f7",
  storageBucket: "fir-tutorial-2d6f7.appspot.com",
  messagingSenderId: "771160260485",
  appId: "1:771160260485:web:5149557de12d7127ac4eec",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// initialize firestore
const db = getFirestore();

// collection reference
const colRef = collection(db, "Books");

//queries
const q = query(colRef, orderBy("createdAt"));

// Real-time collection data using snapshot
onSnapshot(q, (snapshot) => {
  let books = [];

  snapshot.docs.map((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "Books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
