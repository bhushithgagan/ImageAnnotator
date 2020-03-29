//import "./styles/forms.css";
import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function UserDashboard(props) {
  document.title = "DaNotate | Dashboard";

  useEffect(() => {});

  const logoutUser = async () => {
    const res = await axios.get(
      "https://image-annotation-backend.herokuapp.com/user/login"
    );
    console.log(res);
    // if (res.data.isSuccess) props.history.push("/");
    // else console.error("Couldn't logout user");
  };

  return (
    <Menu>
      <Menu.Menu position="right">
        <Dropdown icon="user outline" item>
          <Dropdown.Menu>
            <Dropdown.Item icon="log out" text="Logout" onClick={logoutUser} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(UserDashboard);
