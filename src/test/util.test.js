import React from "react";
import ReactDOM from "react-dom";
import UserOBJ from "../front-end/components/Users";
import SearchBarObj from "../front-end/components/searchBar/searchBar";
import LiveMapOBj from "../front-end/components/LiveMap/index";
import FourOhFour from "../front-end/components/FourOhFour";
import AdminSignUpObj from "../front-end/components/signUp/adminForm";
import ContractorSignUpObj from "../front-end/components/signUp/contractorForm";
import CustomerSignUpObj from "../front-end/components/signUp/customerForm";
import ManagerSignUpObj from "../front-end/components/signUp/managerForm";

it("User component renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<UserOBJ />, div);
});

it("Search Bar renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<SearchBarObj />, div);
});

it("Live Map renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<LiveMapOBj />, div);
});

it("404 renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<FourOhFour />, div);
});

it("Admin signup renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<AdminSignUpObj />, div);
});

it("Contractor signup renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ContractorSignUpObj />, div);
});

it("Customer signup renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<CustomerSignUpObj />, div);
});

it("Manager signup renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ManagerSignUpObj />, div);
});
