import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import firebase from "../../config/Fire";

class AdminProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			photoURL: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getAdminProfile() {
		var user = firebase.auth().currentUser;
		if (user != null) {
			this.setState({
				name: user.displayName,
				email: user.email,
				photoUrl: user.photoUR
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		var user = firebase.auth().currentUser;

		const { history } = this.props;
		const { email, password } = this.state;

		this.setState({ error: false });

		user
			.updateProfile({
				displayName: this.state.name,
				photoUrl: this.state.photoURL
			})
			.then(function() {
				// Update successful.
			})
			.catch(function(error) {
				// An error happened.
			});

		user
			.updateEmail(this.state.email)
			.then(function() {
				user
					.sendEmailVerification()
					.then(function() {
						// Email sent.
					})
					.catch(function(error) {
						// An error happened.
					});
			})
			.catch(function(error) {
				// An error happened.
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
				{/* <navbar /> */}
				<Grid.Column width={6} />
				<Grid.Column width={4}>
					<Form error={error} onSubmit={this.onSubmit}>
						<Header as="h1">Admin profile</Header>

						{error && (
							<Message
								error={error}
								content="That username/password is incorrect. Try again!"
							/>
						)}

						<Form.Input
							inline
							label="Name"
							name="name"
							onChange={this.handleChange}
						/>
						<Form.Input
							inline
							label="Email"
							type="email"
							name="password"
							onChange={this.handleChange}
						/>

						<Form.Input
							inline
							label="Profile Picture"
							name="photoUrl"
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
