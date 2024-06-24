
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfQFv0usA0KGM6Q4zXL3pOkKAuu0uTSTU",
  authDomain: "shopcart-fb457.firebaseapp.com",
  projectId: "shopcart-fb457",
  storageBucket: "shopcart-fb457.appspot.com",
  messagingSenderId: "992722797562",
  appId: "1:992722797562:web:5e2c86e0630f6210d91a43"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app)


export {storage}





