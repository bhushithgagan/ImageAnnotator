import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Message,
  Menu,
  Image,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { USERCREATE, ANNCREATE } from "../../routes/routes";

function SignUpForm(props) {
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [type, setType] = useState(true); //true = user false = annotator

  document.title = "DaNotate | Sign Up";

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRepasswordChange = (event) => setRepassword(event.target.value);
  const handleOrganizationChange = (event) =>
    setOrganization(event.target.value);
  const handleTypeChange = (event) => setType(!type);

  useEffect(() => {
    if (Object.entries(errors).length > 0) setLoad(false);
  }, [errors]);

  function handleSubmit(data) {
    setLoad(true);
    let error = {};
    if (password !== repassword) error.pass = "Passwords do not match";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      error.em = "Enter a valid email address";

    if (!email || !password || !repassword || !name || !username)
      error.fill = "Make sure you fill in all the fields";

    if (password.length < 8)
      error.pass = "Password should be atleast 8 characters in length";

    setErrors(error);
    if (Object.keys(error).length > 0) setLoad(false);
    else {
      if (type)
        axios
          .post(USERCREATE, {
            username,
            password,
            email,
            name,
            organization,
          })
          .then((res) => {
            console.log(res);
            setLoad(false);
            props.history.push({
              pathname: "/userdashboard",
              credentials: { username, password },
            });
          })
          .catch((error) => {
            console.log(error);
            setLoad(false);
            setErrors({ invalid: "Unable to Create Account" });
          });
      else
        axios
          .post(ANNCREATE, {
            username,
            password,
            email,
            name,
            organization,
          })
          .then((res) => {
            console.log(res);
            setLoad(false);
            props.history.push({
              pathname: "/annotatordashboard",
              credentials: { username, password },
            });
          })
          .catch((error) => {
            console.log(error);
            setLoad(false);
            setErrors({ invalid: "Unable to Create Account" });
          });
    }
  }

  return (
    <div>
      <Menu>
        <Image
          src="https://img.icons8.com/ios/50/000000/artificial-intelligence.png"
          size="mini"
          style={{
            height: "50px",
            width: "40px",
            marginLeft: "0.2%",
            paddingTop: "0.3%",
            marginBottom: "0.3%",
          }}
        />
        <span
          style={{
            color: "#008080",
            paddingTop: "0.7%",
            marginLeft: "0.5%",
            fontSize: "160%",
            fontWeight: "200%",
          }}
        >
          <Link to="/" style={{ color: "#008080" }}>
            DaNotate
          </Link>
        </span>
      </Menu>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header
            as="h2"
            textAlign="center"
            style={{ color: "#008080" }}
            className="zoomIn"
          >
            Create your account
          </Header>
          <Form error size="large" onSubmit={handleSubmit}>
            <Segment
              raised
              inverted
              color="teal"
              secondary
              size="large"
              textAlign="left"
              className="zoomIn"
            >
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  onChange={handleEmailChange}
                  label="Enter Email"
                  placeholder="Email"
                  name="email"
                  type="input"
                  className="zoomIn"
                  value={email}
                />
                <Form.Input
                  fluid
                  required
                  onChange={handleNameChange}
                  label="Enter Name"
                  placeholder="Name"
                  name="name"
                  type="input"
                  className="zoomIn"
                  value={name}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  onChange={handleUsernameChange}
                  label="Enter Username"
                  placeholder="Username"
                  name="username"
                  type="input"
                  className="zoomIn"
                  value={username}
                />
                <Form.Input
                  fluid
                  required
                  onChange={handleOrganizationChange}
                  label="Enter Organisation"
                  placeholder="Organisation"
                  name="organisation"
                  type="input"
                  className="zoomIn"
                  value={organization}
                />
              </Form.Group>

              <Form.Input
                fluid
                required
                onChange={handlePasswordChange}
                label="Enter Password"
                placeholder="Password"
                name="password"
                type="password"
                className="zoomIn"
                value={password}
              />
              <Form.Input
                fluid
                required
                onChange={handleRepasswordChange}
                label="Re-enter Password"
                placeholder="Password"
                name="repassword"
                type="password"
                className="zoomIn"
                value={repassword}
              />
              <Form.Group inline>
                <label>Account Type</label>
                User
                <Form.Radio
                  toggle
                  style={{ marginLeft: "20%", marginTop: "10%" }}
                  onChange={handleTypeChange}
                />
                Annotator
              </Form.Group>
              <Button type="submit" loading={load}>
                Sign Up
              </Button>
              {Object.entries(errors).length > 0 && (
                <Message
                  error
                  header="There was some errors with your submission"
                  list={Object.keys(errors).map((key) => errors[key])}
                />
              )}
            </Segment>
            <Message className="zoomIn">
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default withRouter(SignUpForm);
