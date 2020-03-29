//import "./styles/forms.css";
import React, { useState, useEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function UserDashboard(props) {
  document.title = "DaNotate | Dashboard";

  useEffect(() => {});

  return (
    <Menu>
      <Menu.Menu position="right">
        <Dropdown text={props.name} item>
          <Dropdown.Menu>
            <center>
              <Dropdown.Item
                image={{
                  src: props.pic,
                  avatar: false
                }}
              />
            </center>
            <Dropdown.Divider />
            <Dropdown.Item
              icon="user"
              text="Account"
              onClick={() => setActiveItem("Account")}
            />
            <Dropdown.Item icon="log out" text="Logout" onClick={logoutUser} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(UserDashboard);
