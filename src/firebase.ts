import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// dev config
const firebaseConfig = {
  apiKey: 'AIzaSyAKBEBriBX_QUjqfoO8KgPoBpRnfuXoDNw',
  authDomain: 'mappie-dev-6d6c5.firebaseapp.com',
  projectId: 'mappie-dev-6d6c5',
  storageBucket: 'mappie-dev-6d6c5.firebasestorage.app',
  messagingSenderId: '658352365774',
  appId: '1:658352365774:web:5554ec055a7a35b802709f',
}

// prod config
// const firebaseConfig = {
//   apiKey: 'AIzaSyCioeRcdsQBYodec9liwC0W3ylcDssa_TA',
//   authDomain: 'mappie-c7a77.firebaseapp.com',
//   projectId: 'mappie-c7a77',
//   storageBucket: 'mappie-c7a77.firebasestorage.app',
//   messagingSenderId: '421886953902',
//   appId: '1:421886953902:web:e871609fd6cafcc9e0e03f',
//   measurementId: 'G-9MKQJKLSJZ',
// }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
