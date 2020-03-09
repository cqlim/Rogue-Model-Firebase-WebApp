const faker = require("faker");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
console.log("After acquire database configuration.");
const fakeIt = () => {
	return db
		.collection("Customer")
		.add({
			customerAddress: faker.address.city(),
			customerEmail: faker.internet.email(),
			customerFirstName: faker.name.firstName(),
			customerID: "",
			customerLastName: faker.name.lastName(),
			customerPhoneNumber: faker.phone.phoneNumber(),
			customerType: "active",
			customerUsername: faker.internet.userName()
		})
		.then(function(docRef) {
			db.collection("Customer")
				.doc(docRef.id)
				.update({ customerID: docRef.id })
				.catch(err => {
					console.log(err);
					return this.setState({ status: err });
				});
			console.log("Successfully created: ", docRef.id);
			document.getElementById("userName").value = "";
			document.getElementById("email").value = "";
			document.getElementById("password").value = "";
			document.getElementById("firstName").value = "";
			document.getElementById("lastName").value = "";
			document.getElementById("phoneNumber").value = "";
			document.getElementById("address").value = "";
			document.getElementById("customerType").checked = false;
			return null;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
};

Array(1)
	.fill(0)
	.forEach(fakeIt);
