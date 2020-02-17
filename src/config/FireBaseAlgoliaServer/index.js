const admin = require("firebase-admin"); // Import Admin SDK
const firebase = require("firebase");
const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch"); // run: npm install algoliasearch --save to enable this import

dotenv.config();

// configure firebase
admin.initializeApp();
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// Adding a few Customer
// Promise.all([
//   database.ref("/Customer").push({
//     customerAddress: "307 abc a",
//     customerEmail: "ebay@gmail.com",
//     customerFirstName: "cheng",
//     customerID: "HoyWfQF3Z8n9WIjUmupD",
//     customerLastName: "qing asd",
//     customerPhoneNumber: "5419089098",
//     customerType: "unactive",
//     customerUserName: "Cheng"
//   }),
//   database.ref("/Customer").push({
//     customerAddress: "sad",
//     customerEmail: "poConasdasdtractor@gmail.com",
//     customerFirstName: "te",
//     customerID: "Hy2yR0IoF4nqkCahqFrT",
//     customerLastName: "asd",
//     customerPhoneNumber: "213",
//     customerType: "active",
//     customerUserName: "Luther"
//   }),
//   database.ref("/Customer").push({
//     customerAddress: "adsa",
//     customerEmail: "test123@gmail.com",
//     customerFirstName: "qweqwe",
//     customerID: "N66Co8t6jtRdbxwGh1gs",
//     customerLastName: "qweqwe",
//     customerPhoneNumber: "45464365",
//     customerType: "active",
//     customerUserName: "QWE"
//   }),
//   database.ref("/Customer").push({
//     customerAddress: "popeye death by donut",
//     customerEmail: "adsqw@gmail.com",
//     customerFirstName: "asdasd",
//     customerID: "QKFBfD1sSPRkam0IpEq4",
//     customerLastName: "231hgsdf",
//     customerPhoneNumber: "541908909812312",
//     customerType: "active",
//     customerUserName: "poqwe"
//   }),
//   database.ref("/Customer").push({
//     customerAddress: "Retreat",
//     customerEmail: "zhangyu6@oregonstate.edu",
//     customerFirstName: "Yuanjun",
//     customerID: "sEEBOf1wZISRFw83GChSHoc6TSG3",
//     customerLastName: "Zhang",
//     customerPhoneNumber: "5412223333",
//     customerType: "ongoing",
//     customerUserName: "FishPapa"
//   })
// ])
//   .then(() => {
//     console.log("Customer added to Firebase");
//     process.exit(0);
//   })
//   .catch(error => {
//     console.error("Error adding Customer to Firebase", error);
//     process.exit(1);
//   });

// ===========================================================

database.ref("/Customer").once("value", Customers => {
  const records = [];

  Customers.forEach(customer => {
    const childKey = customer.key;
    const childData = customer.val();
    // we set the Algolia objectID as the Firebase .key
    childData.objectID = childKey;
    // Add object for indexing
    records.push(childData);
  });

  index
    .saveObjects(records)
    .then(() => {
      console.log("Cuctomer collection imported into Algolia");
    })
    .catch(error => {
      console.error("Error when importing contact into Algolia", error);
      process.exit(1);
    });
});
