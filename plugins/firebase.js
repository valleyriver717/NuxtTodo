// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLokwao0ggYplRoegzgiC4SjqJfEvFYuc',
  authDomain: 'todo-list-edad0.firebaseapp.com',
  projectId: 'todo-list-edad0',
  databaseURL:
    'https://todo-list-edad0-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'todo-list-edad0.appspot.com',
  messagingSenderId: '36549640225',
  appId: '1:36549640225:web:28b089d71801404c18a360',
  measurementId: 'G-VY3X9PFMG2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)