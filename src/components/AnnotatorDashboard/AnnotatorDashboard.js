import React, { useState, useEffect } from "react";
import {
  Menu,
  Dropdown,
  Header,
  Image,
  Message,
  Divider,
  Container,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ImageAnnotation from "./ImageAnnotation";
import {
  ANNLOGOUT,
  ANNACCDETAILS,
  ANNDELMESS,
  ANNGETMESS,
} from "../../routes/routes";

function AnnotatorDashboard(props) {
  document.title = "DaNotate | Dashboard";

  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [imgsAnnotated, setImgsAnnotated] = useState(0);

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
          setImgsAnnotated(res.data.num_images_annotated);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(ANNGETMESS, {
          withCredentials: false,
          auth: {
            username: props.location.credentials.username,
            password: props.location.credentials.password,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMessages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name]);

  const delMessage = (key) => {
    axios
      .post(
        ANNDELMESS,
        {
          id: messages[key].id,
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
        setMessages(messages.filter((x) => x.id !== messages[key].id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <span style={{ color: "Grey" }}>Welcome,</span> {` ${name}`}
        <span style={{ color: "Grey" }}>!</span>
      </Header>
      <Header
        as="h3"
        color="grey"
        textAlign="center"
        style={{ align: "center", display: "block", margin: "auto" }}
      >
        You've annotated{" "}
        <span style={{ color: "#00BFFF" }}>{imgsAnnotated}</span> images in
        total!
      </Header>
      <Divider horizontal>Instructions from Admin</Divider>
      <Container textAlign="center">
        {messages.length > 0 &&
          messages.map((mess, key) => {
            return (
              <Message
                color="teal"
                header={mess.message}
                onDismiss={() => delMessage(key)}
                key={key}
                style={{
                  maxWidth: "20%",
                  align: "center",
                  display: "inlineBlock",
                  margin: "auto",
                  marginTop: "2em",
                }}
              />
            );
          })}
      </Container>

      <Divider horizontal>Images to Annotate</Divider>
      {typeof props.location.credentials !== "undefined" && (
        <ImageAnnotation
          credentials={props.location.credentials}
          setImgsAnnotated={setImgsAnnotated}
        />
      )}
    </div>
  );
}

export default withRouter(AnnotatorDashboard);
