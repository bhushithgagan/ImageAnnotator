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
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const ENDPOINTLOGOUT =
  "https://image-annotation-backend.herokuapp.com/annotator/logout";

function AnnotatorDashboard(props) {
  document.title = "DaNotate | Dashboard";

  useEffect(() => {});

  const logoutUser = async () => {
    const res = await axios.get(ENDPOINTLOGOUT);
    console.log(res);
    // if (res.data.isSuccess) props.history.push("/");
    // else console.error("Couldn't logout user");
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
            marginBottom: "0.3%"
          }}
        />
        <span
          style={{
            color: "#008080",
            paddingTop: "0.7%",
            marginLeft: "0.5%",
            fontSize: "160%",
            fontWeight: "200%"
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
    </div>
  );
}

export default withRouter(AnnotatorDashboard);
