const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
// load values from the .end file in this directory into process.env
dotenv.config();

// algolia client cinfiguration
const APP_ID = process.env.YOUR_APP_ID;
const ADMIN_KEY = process.env.ADMIN_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

exports.addToIndex = functions.firestore
  .document("Customer/{CustomerId}")
  .onCreate(snapshot => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document("Customer/{CustomerId}")
  .onUpdate(change => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("Customer/{CustomerId}")
  .onDelete(snapshot => {
    const objectID = snapshot.id;
    index.deleteObject(objectID);
  });
