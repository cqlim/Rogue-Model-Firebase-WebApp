import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Helmet } from "react-helmet";
import styles from "./styles.css";
import firebase from "../../config/Fire";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const { history } = this.props;
		const { email, password } = this.state;

		this.setState({ error: false });

		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {
				history.push("/home");
			})
			.catch(err => {
				return this.setState({
					error: true
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
						<Header as="h1">Login</Header>

						{error && (
							<Message
								error={error}
								content="That username/password is incorrect. Try again!"
							/>
						)}

						<Form.Input
							inline
							label="Email"
							name="email"
							onChange={this.handleChange}
						/>
						<Form.Input
							inline
							label="Password"
							type="password"
							name="password"
							onChange={this.handleChange}
						/>
						<Form.Button type="submit">Go!</Form.Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Login;
