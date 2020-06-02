import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Helmet } from "react-helmet";
import styles from "./styles.css";
import firebase from "../../config/Fire";
import { Link } from "react-router-dom";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.authListener = this.authListener(this);
	}

	// Check if user is login or not
	authListener() {
		const { state = {} } = this.props.location;
		const { prevLocation } = state;

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// Login Success
				this.props.history.push(prevLocation || "/home");
			} else {
				// Error happened
			}
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const { history } = this.props;
		const { email, password } = this.state;

		this.setState({ error: false });
		// process Sign in with Firebase
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {
				history.push("/home");
			})
			.catch((err) => {
				return this.setState({
					error: true,
				});
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
					<title>CMS | Login</title>
				</Helmet>

				<Grid.Column width={6} />
				<Grid.Column width={4}>
					<Form
						className={styles.loginForm}
						error={error}
						onSubmit={this.onSubmit}
					>
						<Message>
							<p>
								If you are visiting the side for the virtual showcase purposes,
								please do login with the credential.{" "}
							</p>
							<p>email: guest@gmail.com</p>
							<p>password: guest123</p>
						</Message>
						<img
							src="//static1.squarespace.com/static/5c1e749eaf20965d2a57556a/t/5c1e83714fa51a05053da701/1580156414739/?format=1500w"
							alt="Going Rogue Design | Your One Stop Shop"
							className="Header-branding-logo"
						></img>
						<Header as="h1">Admin Sign-In</Header>

						{error && (
							<Message
								error={error}
								content="That username/password is incorrect. Try again!"
							/>
						)}

						<Form.Input
							inline
							name="email"
							onChange={this.handleChange}
							placeholder="email"
						/>
						<Form.Input
							inline
							type="password"
							name="password"
							onChange={this.handleChange}
							placeholder="password"
						/>

						<Form.Button type="submit">Login</Form.Button>
						<Link to="/forget-password">
							<p style={{ color: "#2d8672" }}>Forget password !</p>
						</Link>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
