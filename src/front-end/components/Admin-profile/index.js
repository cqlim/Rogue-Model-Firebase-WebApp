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
      email: "",
      photoURL: "",
      status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getAdminProfile = this.getAdminProfile(this);
  }

  getAdminProfile() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.setState({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      });
    }
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
    if (this.state.email.trim() == "") {
      return this.setState({ status: "Error: Email is empty." });
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
      })
      .catch(error => {
        return this.setState({ status: error });
      });

    user
      .updateEmail(this.state.email)
      .then(function() {
        user
          .sendEmailVerification()
          .then(function() {
            // Email sent.
            history.push("/home");
          })
          .catch(error => {
            return this.setState({ status: error });
          });
      })
      .catch(error => {
        console.log(error);
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

            <Image src={firebase.auth.displayName} size="medium" circular />

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
            <Form.Input
              inline
              placeholder="Email"
              type="email"
              name="email"
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
