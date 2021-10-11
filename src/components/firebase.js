import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBWRiLd2XD6PEKbAxlMdKimh7xftAa94mM",
    authDomain: "whatsapp-clone-1ec4f.firebaseapp.com",
    projectId: "whatsapp-clone-1ec4f",
    storageBucket: "whatsapp-clone-1ec4f.appspot.com",
    messagingSenderId: "368637384031",
    appId: "1:368637384031:web:5ddc3efc36342a59ba92ea",
    measurementId: "G-0SQ651179C"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;