import React from "react";
import { Menu, Button, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
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
        
      </span>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button size="large" as={Link} to="/signup" animated="fade">
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>Join Us!</Button.Content>
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button size="large" color="teal" as={Link} to="/login" animated>
            <Button.Content visible>Login</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Link to="/adminlogin">
            <Button color="blue" animated>
              <Button.Content visible>Admin Login</Button.Content>
              <Button.Content hidden>
                <Icon name="address card outline" />
              </Button.Content>
            </Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default HomeNav;
