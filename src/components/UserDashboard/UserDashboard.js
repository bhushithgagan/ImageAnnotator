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
  List,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import {
  USERLOGOUT,
  USERUPLOAD,
  USERACCDETAILS,
  USERGETIMG,
  USERGETUNANNIMG,
} from "../../routes/routes";

function UserDashboard(props) {
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [noDownloadUrls, setNoDownloadUrls] = useState([]);
  const [folder, setFolder] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [load, setLoad] = useState(false);

  document.title = "DaNotate | Dashboard";

  const handleCategoriesChange = (event) => setCategories(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  const onFileChange = (event) => {
    console.log(event.target.files);
    setFile(Object.values(event.target.files));
  };

  useEffect(() => {
    if (
      typeof props.location.credentials == "undefined" ||
      !props.location.credentials.username ||
      !props.location.credentials.password
    )
      props.history.push("Dont-Forget-To-Login");
    else {
      setUsername(props.location.credentials.username);
      setPassword(props.location.credentials.password);
      axios
        .get(USERACCDETAILS, {
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
  }, [username]);

  const logoutUser = () => {
    axios
      .get(USERLOGOUT, {
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
        if (error.response.status == 401) props.history.push("/");
        else console.error("Couldn't logout user");
      });
  };

  const getImages = (event) => {
    axios
      .get(USERGETIMG, {
        withCredentials: false,
        auth: {
          username,
          password,
        },
      })
      .then((res) => {
        console.log(res);
        setDownloadUrls(res.data);
        // let arr = res.data.map((a) => a.imageName);
        // let x = res.data.map((a) => a.folderName);
        // setFolder(x.filter((a, b) => x.indexOf(a) === b));
        axios
          .get(USERGETUNANNIMG, {
            withCredentials: false,
            auth: {
              username,
              password,
            },
          })
          .then((res) => {
            console.log(res);
            setNoDownloadUrls(res.data);
            // let ar = res.data.map((a) => a.imageName);
            // let a = [];
            // for (const value of arr) {
            //   if (ar.includes(value)) a.push(true);
            //   else a.push(false);
            // }
            // setDisabled(a);
            // console.log(a);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getDataUrl = async (url) => {
  //   let blob = await fetch(url).then((r) => r.blob());
  //   let dataUrl = await new Promise((resolve) => {
  //     let reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  //   return dataUrl;
  // };

  const handleSubmit = (event) => {
    setLoad(true);
    let error = {};

    if (!tags || !categories || !file) {
      setLoad(false);
      error.fields = "Make sure you fill in all the fields and upload a file";
      setErrors(error);
    } else {
      setErrors(error);
      const formData = new FormData();
      for (const img of file) formData.append("files", img);
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
          setLoad(false);
          setTags("");
          setCategories("");
          console.log("file uploaded");
          console.log(data);
        })
        .catch((e) => {
          setLoad(false);
          setErrors({ upload: "Couldn't Upload Files" });
          console.log(e);
        });
    }
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
        <Grid.Column style={{ maxWidth: 450, marginTop: "-5%" }}>
          <Header
            as="h1"
            color="teal"
            textAlign="center"
            style={{ marginTop: "5%" }}
          >
            Welcome, {name}!
          </Header>
          <Form
            size="large"
            onSubmit={handleSubmit}
            style={{ marginTop: "30%" }}
          >
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              style={{ marginTop: "5%" }}
            >
              <Icon name="upload" />
            </Header>

            <Segment stacked>
              <input
                type="file"
                id="file"
                name="filename"
                accept="image/*"
                onChange={onFileChange}
                multiple
                webkitdirectory=""
                mozdirectory=""
                directory=""
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
            <Button
              animated
              loading={load}
              type="submit"
              style={{ marginTop: "5%" }}
            >
              <Button.Content visible>Upload</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow up" />
              </Button.Content>
            </Button>
          </Form>

          <div style={{ marginTop: "10%" }}>
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              style={{ marginTop: "5%" }}
            >
              <Icon name="download" />
            </Header>
            <Button animated onClick={getImages} color="green">
              <Button.Content visible>Get Images</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow down" />
              </Button.Content>
            </Button>
            {downloadUrls.length > 0 && (
              <div>
                {" "}
                <List divided relaxed>
                  {downloadUrls.map((data, key) => {
                    return (
                      <List.Item key={key}>
                        <List.Icon
                          name="file image"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content key={key}>
                          <List.Header>
                            {data.imageName}
                            <Button
                              style={{
                                display: "inline-block",
                                textAlign: "center",
                                width: "100%",
                              }}
                            >
                              <a href={data.url} target="_blank" download>
                                Download
                              </a>
                            </Button>
                          </List.Header>

                          <List.Description></List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                  {noDownloadUrls.map((data, key) => {
                    return (
                      <List.Item key={key}>
                        <List.Icon
                          name="file image"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content key={key}>
                          <List.Header>
                            {data.imageName}
                            <Button
                              disabled
                              style={{
                                display: "inline-block",
                                textAlign: "center",
                                width: "100%",
                              }}
                            >
                              <a href={data.url} target="_blank" download>
                                Download
                              </a>
                            </Button>
                          </List.Header>

                          <List.Description></List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>{" "}
              </div>
            )}
          </div>

          {Object.entries(errors).length > 0 && (
            <Message
              error
              header="Could Not Upload"
              list={Object.keys(errors).map((key) => errors[key])}
              size="small"
              className="zoomIn"
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default withRouter(UserDashboard);
