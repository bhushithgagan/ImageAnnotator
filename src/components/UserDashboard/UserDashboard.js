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
import { withRouter } from "react-router-dom";
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
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [annotatedCounts, setAnnotatedCounts] = useState({});
  const [unannotatedCounts, setUnannotatedCounts] = useState({});
  let folders = [];

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
        if (error.response.status === 401) props.history.push("/");
        else console.error("Couldn't logout user");
      });
  };

  const getImages = (event) => {
    setAnnotatedCounts({});
    setUnannotatedCounts({});

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
        let counts = {};
        let x = res.data.map((a) => {
          let folderName = a.folderName;
          if (!(folderName in counts)) counts[folderName] = 1;
          else counts[folderName] += 1;
          return folderName;
        });
        setAnnotatedCounts(counts);
        let y = new Set(x);

        setFolder([...y]);
        folders = [...y];

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
            if (res.data.length !== 0) {
              let counts = {};
              let x = res.data.map((a) => {
                let folderName = a.folderName;
                if (!(folderName in counts)) counts[folderName] = 1;
                else counts[folderName] += 1;
                return folderName;
              });
              setUnannotatedCounts(counts);
            } else {
              let c = {};
              for (let i of folders) {
                c[i] = 0;
              }
              setUnannotatedCounts(c);
            }
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

  const downloadCSV = (allImages, key) => {
    let images = allImages.filter((x) => x.folderName === folder[key]);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Image Name,URL,Category \r\n";
    images.map((x) => {
      csvContent += x.imageName + "," + x.url + "," + x.category + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${folder[key]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

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
          setSuccess(true);
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
      <Grid style={{ align: "center" }}>
        <Grid.Column style={{ display: "block", margin: "auto" }}>
          <Header as="h1" color="teal" textAlign="center">
            Welcome, {name}!
          </Header>
          <Form
            size="large"
            onSubmit={handleSubmit}
            style={{ display: "block", margin: "auto", marginTop: "1em" }}
          >
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              style={{ display: "block", marginTop: "4em" }}
            >
              <Icon name="upload" />
            </Header>

            <Segment
              stacked
              style={{ maxWidth: "25%", display: "block", margin: "auto" }}
            >
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
                style={{
                  display: "flex",
                  margin: "auto",
                  position: "relative",
                  marginTop: "1em",
                }}
              />
              <Input
                focus
                placeholder="Tags"
                onChange={handleTagsChange}
                value={tags}
                style={{
                  display: "flex",
                  margin: "auto",
                  position: "relative",
                  marginTop: "1em",
                }}
              />
            </Segment>
            <Button
              animated
              loading={load}
              type="submit"
              style={{ display: "block", margin: "auto", marginTop: "1em" }}
            >
              <Button.Content visible>Upload</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow up" />
              </Button.Content>
            </Button>
          </Form>
          <div style={{ marginTop: "5%" }}>
            {success && (
              <Message positive>
                <Message.Header>Success!</Message.Header>
                <p>Successfully Uploaded!</p>
              </Message>
            )}
          </div>

          <div style={{ align: "center" }}>
            <Header
              as="h2"
              color="teal"
              textAlign="center"
              style={{ marginTop: "3em" }}
            >
              <Icon name="download" />
            </Header>
            <Button
              animated
              onClick={getImages}
              color="teal"
              style={{ display: "block", margin: "auto", marginTop: "1em" }}
            >
              <Button.Content visible>Request Images</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow down" />
              </Button.Content>
            </Button>

            {folder.length > 0 &&
              folder.map((fol, okey) => {
                return (
                  <div key={okey} style={{ marginTop: "2%", align: "center" }}>
                    <Dropdown
                      text={
                        fol +
                        "\t\t\t\t (" +
                        Math.round(
                          (annotatedCounts[fol] * 100) /
                            (unannotatedCounts[fol] + annotatedCounts[fol])
                        ) +
                        "% Done)"
                      }
                      icon="folder"
                      floating
                      labeled
                      button
                      scrolling
                      className="icon"
                      compact
                      style={{
                        margin: "auto",
                        width: "28em",
                        display: "block",
                      }}
                      key={okey}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Header
                          icon="folder"
                          content={
                            " Annotated: " +
                            annotatedCounts[fol] +
                            " Unannotated: " +
                            unannotatedCounts[fol]
                          }
                          key={okey}
                        />
                        {downloadUrls.length > 0 && (
                          <div>
                            {" "}
                            <Dropdown.Item>
                              {downloadUrls.map((data, key) => {
                                if (data.folderName === fol)
                                  return (
                                    <Grid columns={2} divided key={key}>
                                      <Grid.Row>
                                        <Grid.Column
                                          style={{ align: "center" }}
                                        >
                                          <Icon
                                            name="file image"
                                            size="large"
                                          />

                                          {data.imageName}
                                        </Grid.Column>
                                        <Grid.Column
                                          style={{ align: "center" }}
                                        >
                                          <Button
                                            style={{
                                              display: "block",
                                              margin: "auto",
                                            }}
                                          >
                                            <a
                                              href={data.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              download
                                            >
                                              Download
                                            </a>
                                          </Button>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  );
                              })}
                            </Dropdown.Item>
                            <Dropdown.Item>
                              {noDownloadUrls.map((data, key) => {
                                if (data.folderName === fol)
                                  return (
                                    <div key={key}>
                                      <Grid columns={2} divided>
                                        <Grid.Row>
                                          <Grid.Column
                                            style={{ align: "center" }}
                                          >
                                            <Icon
                                              name="file image"
                                              size="large"
                                            />

                                            {data.imageName}
                                          </Grid.Column>
                                          <Grid.Column
                                            style={{ align: "center" }}
                                          >
                                            <Button
                                              disabled
                                              style={{
                                                display: "block",
                                                margin: "auto",
                                              }}
                                            >
                                              <a
                                                href={data.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                              >
                                                Download
                                              </a>
                                            </Button>
                                          </Grid.Column>
                                        </Grid.Row>
                                      </Grid>
                                    </div>
                                  );
                              })}
                            </Dropdown.Item>
                          </div>
                        )}
                        <Dropdown.Divider />
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      color="green"
                      onClick={(event) => downloadCSV(downloadUrls, okey)}
                      style={{
                        display: "block",
                        margin: "auto",
                        marginTop: "1em",
                      }}
                    >
                      Download CSV
                    </Button>
                  </div>
                );
              })}
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
