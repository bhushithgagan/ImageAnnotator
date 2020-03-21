//import "./styles/forms.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Message,
  Image
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
//import useForm from "../customHooks/useForm";

//const ENDPOINT = "https://college-dashboard-backend.herokuapp.com/account/signup";
// const ENDPOINT = "http://localhost:4000/account/signup";

function validate(data) {
  let errors = {};

  if (data.password !== data.repassword)
    errors.passMatch = "Passwords do not match";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email))
    errors.correctEmail = "Enter a valid email address";
  if (
    !data.email ||
    !data.password ||
    !data.repassword ||
    !data.name ||
    !data.usn
  )
    errors.allFilled = "Make sure you fill in all the fields";
  for (let key in data)
    if (key.startsWith("credits") && isNaN(Number(data[key])))
      errors.crednan = "Credits should be numbers";
  for (let key in data)
    if (key.startsWith("marks") && isNaN(Number(data[key])))
      errors.marksnan = "Marks should be numbers";
  for (let key in data)
    if (key.startsWith("attd") && isNaN(Number(data[key])))
      errors.attdnan = "Attendance should be numbers";
  if (notComplete(data, Number(data.numsubjects)))
    errors.allFilled = "Make sure you fill in all subject fields";

  return errors;
}

function notComplete(obj, subCount) {
  for (let i = 0; i < subCount; i++) {
    if (
      !obj.hasOwnProperty(`subject${i + 1}`) ||
      !obj.hasOwnProperty(`credits${i + 1}`)
    )
      return true;
  }
  return false;
}

function SignUpForm(props) {
  const [load, setLoad] = useState(false);
  //   const [
  //     handleSubmit,
  //     handleChange,
  //     formData,
  //     setFormData,
  //     submitResponse,
  //     errors,
  //     setErrors
  //   ] = useForm(ENDPOINT, validate);
  const [newSec, setNewSec] = useState(0);

  document.title = "DaNotate | Sign Up";

  //if (submitResponse === true) props.history.push("/dashboard");

  //   useEffect(() => {
  //     if (Object.entries(errors).length > 0) setLoad(false);
  //   }, [errors]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header
          as="h2"
          textAlign="center"
          style={{ color: "#008080" }}
          className="zoomIn"
        >
          Create your account
        </Header>
        <Form
          error
          size="large" //onSubmit={handleSubmit}
        >
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
                //onChange={handleChange}
                label="Enter Email"
                placeholder="Email"
                name="email"
                type="input"
                className="zoomIn"
                //value={formData.email || ""}
              />
              <Form.Input
                fluid
                required
                //onChange={handleChange}
                label="Enter Name"
                placeholder="Name"
                name="name"
                type="input"
                className="zoomIn"
                //value={formData.name || ""}
              />
            </Form.Group>

            <Form.Input
              fluid
              required
              //onChange={handleChange}
              label="Enter Password"
              placeholder="Password"
              name="password"
              type="password"
              className="zoomIn"
              //value={formData.password || ""}
            />
            <Form.Input
              fluid
              required
              //onChange={handleChange}
              label="Re-enter Password"
              placeholder="Password"
              name="repassword"
              type="password"
              className="zoomIn"
              //value={formData.repassword || ""}
            />
            <Form.Group inline>
              <label>Account Type</label>
              <Form.Radio
                label="User"
                value="user"
                //onChange={this.handleChange}
              />
              <Form.Radio
                label="Annotator"
                value="annotator"
                //onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              type="button"
              //   onClick={() => {
              //     if (!formData.profilepic || !formData.profilepic.length)
              //       setFormData({
              //         ...formData,
              //         profilepic:
              //           "https://react.semantic-ui.com/images/wireframe/square-image.png"
              //       });
              //     setNewSec(1);
              //   }}
            >
              Next
            </Button>
          </Segment>
          <Message className="zoomIn">
            Already have an account? <Link to="/login">Login</Link>
          </Message>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default withRouter(SignUpForm);
