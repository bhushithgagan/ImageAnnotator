import React, { useState, useEffect } from "react";
//import "./styles/forms.css";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const ENDPOINTUSER =
  "https://image-annotation-backend.herokuapp.com/user/login";
const ENDPOINTANN =
  "https://image-annotation-backend.herokuapp.com/annotator/login";

function LoginForm(props) {
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(true); //true = user false = annotator

  document.title = "DaNotate | Login";

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  const handleTypeChange = event => setType(!type);

  //if (submitResponse === true) props.history.push("/dashboard");

  useEffect(() => {
    if (Object.entries(errors).length > 0) setLoad(false);
  }, [errors]);

  function handleSubmit(data) {
    let error = {};
    if (!password || !username)
      error.fill = "Make sure you fill in all the fields";

    setErrors(error);

    if (type) axios.post(ENDPOINTUSER);
    else axios.post(ENDPOINTANN);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header
          as="h2"
          textAlign="center"
          className="zoomIn"
          style={{ color: "#008080" }}
        >
          Hello, there. Login to your account
        </Header>
        <Form error size="large" onSubmit={handleSubmit}>
          <Segment raised inverted color="teal" secondary className="zoomIn">
            <Form.Input
              fluid
              onChange={handleUsernameChange}
              icon="address card"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="input"
              className="zoomIn"
            />
            <Form.Input
              fluid
              onChange={handlePasswordChange}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              className="zoomIn"
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

            <Button
              type="submit"
              className="zoomIn"
              loading={load}
              onClick={() => setLoad(true)}
            >
              Login
            </Button>
            <Button inverted as={Link} to="/signup" className="zoomIn">
              Sign Up
            </Button>
          </Segment>
          {Object.entries(errors).length > 0 && (
            <Message
              error
              header="Could Not Sign In"
              list={Object.keys(errors).map(key => errors[key])}
              size="small"
              className="zoomIn"
            />
          )}
          <Message className="zoomIn">
            Forgot your password?{" "}
            <Link to="/reset" className="zoomIn">
              Reset
            </Link>
          </Message>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default withRouter(LoginForm);
