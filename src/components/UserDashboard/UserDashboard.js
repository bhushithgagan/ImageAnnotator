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
  Input,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { USERLOGOUT, USERUPLOAD } from "../../routes/routes";

function UserDashboard(props) {
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  document.title = "DaNotate | Dashboard";

  const handleCategoriesChange = (event) => setCategories(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);

  useEffect(() => {
    if (!username || !password) props.history.push("Dont-Forget-To-Login!");
    else {
      setUsername(props.location.credentials.username);
      setPassword(props.location.credentials.password);
    }
  });

  const logoutUser = async () => {
    const res = await axios.get(USERLOGOUT);
    console.log(res);
    // if (res.data.isSuccess) props.history.push("/");
    // else console.error("Couldn't logout user");
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    console.log(props);

    const formData = new FormData();
    formData.append("files", file);
    formData.append("categories", categories);
    formData.append("tags", tags);
    axios
      .post(USERUPLOAD, formData, {
        headers: { "content-type": "multipart/form-data" },
        auth: {
          username,
          password,
        },
      })
      .then((data) => {
        console.log("file uploaded");
        console.log(data);
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
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
          <Form
            size="large"
            onSubmit={handleSubmit}
            style={{ marginTop: "30%" }}
          >
            <Segment stacked>
              <input
                type="file"
                id="file"
                name="filename"
                accept="image/*"
                onChange={onFileChange}
                multiple
              />
              <Input
                focus
                placeholder="Categories"
                onChange={handleCategoriesChange}
                value={categories}
                style={{ marginTop: "4%" }}
              />
              <Input
                focus
                placeholder="Tags"
                onChange={handleTagsChange}
                value={tags}
                style={{ marginTop: "4%", marginLeft: "2%" }}
              />
            </Segment>
            <Button animated type="submit" style={{ marginTop: "5%" }}>
              <Button.Content visible>Upload</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow up" />
              </Button.Content>
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default withRouter(UserDashboard);
