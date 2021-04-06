import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "",
	authDomain: "rogue-model.firebaseapp.com",
	databaseURL: "https://rogue-model.firebaseio.com",
	projectId: "rogue-model",
	storageBucket: "rogue-model.appspot.com",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
};

const fire = firebase.initializeApp(config);
export default fire;
