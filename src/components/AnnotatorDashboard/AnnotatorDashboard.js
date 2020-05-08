//import "./styles/forms.css";
import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Header, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ImageAnnotation from "./ImageAnnotation";
import { ANNLOGOUT, ANNACCDETAILS } from "../../routes/routes";

function AnnotatorDashboard(props) {
  document.title = "DaNotate | Dashboard";

  const [name, setName] = useState("");

  useEffect(() => {
    if (
      typeof props.location.credentials == "undefined" ||
      !props.location.credentials.username ||
      !props.location.credentials.password
    )
      props.history.push("Dont-Forget-To-Login");
    else {
      axios
        .get(ANNACCDETAILS, {
          withCredentials: false,
          auth: {
            username: props.location.credentials.username,
            password: props.location.credentials.password,
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name]);

  const logoutAnnotator = () => {
    axios
      .get(ANNLOGOUT, {
        withCredentials: false,
        auth: {
          username: "",
          password: "",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) props.history.push("/");
        else console.error("Couldn't logout annotator");
      });
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
                onClick={logoutAnnotator}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Header
        as="h1"
        color="teal"
        textAlign="center"
        style={{ align: "center", display: "block", margin: "auto" }}
      >
        Welcome, {name}!
      </Header>
      {typeof props.location.credentials !== "undefined" && (
        <ImageAnnotation credentials={props.location.credentials} />
      )}
    </div>
  );
}

export default withRouter(AnnotatorDashboard);
