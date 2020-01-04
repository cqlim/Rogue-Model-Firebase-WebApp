import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyCR7Pq2ZJSJSEoL2xLCeDm_ZdzuGmojywo",
	authDomain: "login-p-d96a7.firebaseapp.com",
	databaseURL: "https://login-p-d96a7.firebaseio.com",
	projectId: "login-p-d96a7",
	storageBucket: "login-p-d96a7.appspot.com",
	messagingSenderId: "686099560636",
	appId: "1:686099560636:web:b6a45896ddae455eeab8b9",
	measurementId: "G-563EPDMJER"
};

const fire = firebase.initializeApp(config);
export default fire;
