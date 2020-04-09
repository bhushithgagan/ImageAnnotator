//import "./styles/forms.css";
import React, { useState, useEffect } from "react";
import {
  Menu,
  Dropdown,
  Icon,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const ENDPOINTLOGOUT =
  "https://image-annotation-backend.herokuapp.com/user/logout";

function UserDashboard(props) {
  document.title = "DaNotate | Dashboard";

  useEffect(() => {});

  const logoutUser = async () => {
    const res = await axios.get(ENDPOINTLOGOUT);
    console.log(res);
    // if (res.data.isSuccess) props.history.push("/");
    // else console.error("Couldn't logout user");
  };

  const uploadFile = (event) => {
    // filename
    console.log("filename " + event.target.value);

    //file
    console.log("file " + event.target.files[0]);

    console.log(event);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    // axios
    //   .put("", formData, { headers: { "content-type": "multipart/form-data" } })
    //   .then(data => {
    //     console.log("file uploaded");
    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log("error");
    //     console.log(e);
    //   });
  };

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
          DaNotate
        </span>
        <Menu.Menu position="right">
          <Dropdown icon="user outline" item>
            <Dropdown.Menu>
              <Dropdown.Item
                icon="log out"
                text="Logout"
                onClick={logoutUser}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450, marginTop: "-10%" }}>
          <Header as="h2" color="teal" textAlign="center">
            <Icon name="upload" /> Upload
          </Header>
          <Form size="large" style={{ marginTop: "30%" }}>
            <Segment stacked>
              <input
                type="file"
                id="file"
                name="filename"
                accept="image/*"
                onChange={uploadFile}
                multiple
              />

              <Button animated style={{ marginTop: "5%" }}>
                <Button.Content visible>Upload</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow up" />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default withRouter(UserDashboard);
