import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
import { firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA3kp73RvI_6UPbOKTiYL1v7NryE3QMve4',
  authDomain: 'clonenetflix-d0629.firebaseapp.com',
  projectId: 'clonenetflix-d0629',
  storageBucket: 'clonenetflix-d0629.appspot.com',
  messagingSenderId: '527970686841',
  appId: '1:527970686841:web:c022c5d8662ce5325381a8',
  measurementId: 'G-ZH3GSBVBSC'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

export const auth = getAuth(app)

export const storage = getStorage()

export const provider = new GoogleAuthProvider()
