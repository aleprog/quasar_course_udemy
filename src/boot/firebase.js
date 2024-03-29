// https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import { APIKEY } from './config'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: APIKEY,
  authDomain: 'awesome-todo-9597a.firebaseapp.com',
  databaseURL: 'https://awesome-todo-9597a.firebaseio.com',
  projectId: 'awesome-todo-9597a',
  storageBucket: '',
  messagingSenderId: '894657538960',
  appId: '1:894657538960:web:00e86478b83c0cbb'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
