import React from "react";
import { Grid, Form, Header, Message, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import firebase from "../../config/Fire";
import styles from "./styles.css";

class AdminProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			photoURL: "",
			status: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const getPhoto = () => {
			var user = firebase.auth().currentUser;
			if (user != null) {
				this.setState({
					name: user.displayName,
					photoUrl: user.photoURL
				});
				console.log(this.state.photoURL);
			}
		};
	}

	onSubmit(e) {
		e.preventDefault();
		var user = firebase.auth().currentUser;

		const { history } = this.props;
		const { email, password } = this.state;

		this.setState({ error: false });

		if (this.state.name.trim() == "") {
			return this.setState({ status: "Error: Name is empty." });
		}
		if (this.state.photoURL.trim() == "") {
			return this.setState({ status: "Error: PhotoURL is empty." });
		}

		user
			.updateProfile({
				displayName: this.state.name,
				photoUrl: this.state.photoURL
			})
			.then(ref => {
				// Update successful.
				this.setState({ status: "Success" });
			})
			.catch(error => {
				return this.setState({ status: error });
			});
	}

	handleChange(e, { name, value }) {
		this.setState({ [name]: value });
	}

	render() {
		const { error } = this.state;

		return (
			<Grid>
				<Helmet>
					<title>Profile Information</title>
				</Helmet>
				<Grid.Column width={6} />
				<Grid.Column width={4}>
					<Form error={error} onSubmit={this.onSubmit} className="adminProfile">
						<Header as="h1">Admin profile</Header>

						{this.state.status && (
							<Message error={error.status} content={this.state.status} />
						)}

						<Image
							src={
								this.state.photoURL ||
								"https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg"
							}
							size="medium"
							circular
						/>

						<Form.Input
							inline
							placeholder="Profile Picture"
							name="photoURL"
							value={this.state.displayName}
							onChange={this.handleChange}
						/>

						<Form.Input
							inline
							placeholder="Name"
							id="name"
							name="name"
							onChange={this.handleChange}
						/>

						<Form.Button type="submit">Go!</Form.Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default AdminProfile;
