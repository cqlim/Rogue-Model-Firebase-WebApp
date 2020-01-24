import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyDtOMz5_Abnd8Et1EHB16oAb_KCgd5x0F0",
	authDomain: "rogue-model.firebaseapp.com",
	databaseURL: "https://rogue-model.firebaseio.com",
	projectId: "rogue-model",
	storageBucket: "rogue-model.appspot.com",
	messagingSenderId: "804059970146",
	appId: "1:804059970146:web:0c68c921b52bdd56552f3b",
	measurementId: "G-CBBZ1CQJF4"
};

const fire = firebase.initializeApp(config);

export default fire;
