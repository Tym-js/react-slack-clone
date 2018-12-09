import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var config = {
  apiKey: "AIzaSyDQV3w7rlFu6WpD1KfO68QhX6LTKX2SsWA",
  authDomain: "react-slack-clone-90b98.firebaseapp.com",
  databaseURL: "https://react-slack-clone-90b98.firebaseio.com",
  projectId: "react-slack-clone-90b98",
  storageBucket: "react-slack-clone-90b98.appspot.com",
  messagingSenderId: "426105338058"
}
firebase.initializeApp(config)

export default firebase
