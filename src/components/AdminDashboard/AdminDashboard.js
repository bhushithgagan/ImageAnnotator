import React, { useState, useEffect } from "react";
import {
  Header,
  Card,
  Menu,
  Image,
  Dropdown,
  Button,
  Form,
  TextArea,
  List,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  ADMINANN,
  ADMINDETS,
  ADMINLOGOUT,
  ADMINSENDMESS,
  ADMINDELANN,
} from "../../routes/routes";
import "./AnnotatorList.css";

function AdminDashboard(props) {
  document.title = "DaNotate | Admin Dashboard";

  const avatars = [
    "matthew.png",
    "elliot.jpg",
    "steve.jpg",
    "molly.png",
    "jenny.jpg",
    "daniel.jpg",
  ];

  const [annotators, setAnnotators] = useState([]);
  const [admin, setAdmin] = useState({});
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => setMessage(event.target.value);

  useEffect(() => {
    if (
      typeof props.location.credentials == "undefined" ||
      !props.location.credentials.username ||
      !props.location.credentials.password
    )
      props.history.push("Dont-Forget-To-Login");
    else {
      axios
        .get(ADMINDETS, {
          withCredentials: false,
          auth: {
            username: props.location.credentials.username,
            password: props.location.credentials.password,
          },
        })
        .then((res) => {
          setAdmin(res.data);
          console.log(res);
          axios
            .get(ADMINANN, {
              withCredentials: false,
              auth: {
                username: props.location.credentials.username,
                password: props.location.credentials.password,
              },
            })
            .then((res) => {
              setAnnotators(res.data);
              console.log(res);
            });
        });
    }
  }, []);

  const deleteAnn = (annusername) => {
    axios
      .post(
        ADMINDELANN,
        {
          username: annusername,
        },
        {
          headers: { "content-type": "application/json" },
          withCredentials: false,
          auth: {
            username: props.location.credentials.username,
            password: props.location.credentials.password,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAnnotators(annotators.filter((x) => x.username !== annusername));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = (annusername) => {
    axios
      .post(
        ADMINSENDMESS,
        {
          username: annusername,
          message,
        },
        {
          headers: { "content-type": "application/json" },
          withCredentials: false,
          auth: {
            username: props.location.credentials.username,
            password: props.location.credentials.password,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutAdmin = () => {
    axios
      .get(ADMINLOGOUT, {
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
        else console.error("Couldn't logout Admin");
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
                onClick={logoutAdmin}
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
        Welcome, {admin.name}!
      </Header>
      <Card.Group centered itemsPerRow={4}>
        {annotators.map((ann, key) => {
          return (
            <Card
              color="teal"
              className="grow"
              size="mini"
              raised
              style={{ maxWidth: "20%", marginTop: "5em" }}
              key={key}
            >
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src={`https://react.semantic-ui.com/images/avatar/large/${
                    avatars[key % 5]
                  }`}
                />
                <Button
                  color="red"
                  floated="right"
                  inverted
                  onClick={(event) => deleteAnn(ann.username)}
                >
                  Delete
                </Button>
                <Card.Header>{ann.name}</Card.Header>
                <Card.Meta>{ann.email}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item
                      icon="hashtag"
                      content={`Images Annotated: ${ann.num_images_annotated}`}
                    />

                    <List.Item
                      icon="calendar alternate"
                      content={`Created On: ${ann.created_on.slice(0, 10)}`}
                    />
                  </List>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Form>
                  <TextArea
                    placeholder="Message to Annotator"
                    onChange={handleMessageChange}
                  />
                </Form>
                <div className="ui two buttons">
                  <Button
                    color="green"
                    inverted
                    onClick={(event) => sendMessage(ann.username)}
                  >
                    Send Message to {ann.username}
                  </Button>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}

export default withRouter(AdminDashboard);
