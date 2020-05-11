import React, { useState, useEffect } from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import {
  Button,
  Form,
  Segment,
  Header,
  Message,
  Input,
  Icon,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { ANNGETIMG, ANNUPLOAD } from "../../routes/routes";
import axios from "axios";

function ImageAnnotation(props) {
  const { username, password } = props.credentials;
  const [categories, setCategories] = useState("");
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCategoriesChange = (event) => setCategories(event.target.value);

  const handleSubmit = (event, key) => {
    setLoad(true);
    let error = {};
    if (!categories) {
      setLoad(false);
      error.fields = "Make sure you fill in all the fields and upload a file";
      setErrors(error);
    } else if (!images[key].categories.includes(categories)) {
      setLoad(false);
      error.cat = "Make sure categories are right";
      setErrors(error);
    } else {
      setErrors(error);
      let canv = document.getElementsByClassName("lower-canvas")[key];
      let url = canv.toDataURL(console.log);
      var byteString;
      if (url.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(url.split(",")[1]);
      else byteString = unescape(url.split(",")[1]);

      let mimeString = url.split(",")[0].split(":")[1].split(";")[0];

      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);

      var theBlob = new Blob([ia], { type: mimeString });
      var img = new File(
        [theBlob],
        images[key].folderName + "/" + images[key].imageName
      );

      const formData = new FormData();
      formData.append("files", img);
      formData.append("categories", categories);
      axios
        .post(ANNUPLOAD, formData, {
          headers: { "content-type": "multipart/form-data" },
          auth: {
            username,
            password,
          },
        })
        .then((data) => {
          setLoad(false);
          setCategories("");
          console.log("file uploaded");
          console.log(data);
          const { history, location } = props;
          if (location.pathname === "/annotatordashboard") {
            history.replace(`/reload`);
            setTimeout(() => {
              history.replace({
                pathname: "/annotatordashboard",
                credentials: { username, password },
              });
            });
          } else {
            props.history.push({
              pathname: "/annotatordashboard",
              credentials: { username, password },
            });
          }
          props.setImgsAnnotated(prev => prev + 1);
        })
        .catch((e) => {
          setLoad(false);
          console.log("Error");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    axios
      .get(ANNGETIMG, {
        withCredentials: false,
        auth: {
          username,
          password,
        },
      })
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
        if (res.data.length === 0) setDone(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <div style={{ align: "left", overlow: "auto" }}>
      {done && (
        <div style={{ display: "flex", marginLeft: "47%", marginTop: "5em" }}>
          <Message positive>
            <Message.Header>All Caught Up!</Message.Header>
          </Message>
        </div>
      )}
      {images.map((img, key) => (
        <div
          key={key}
          style={{ display: "inlineBlock", margin: "auto", marginLeft: "1em" }}
        >
          <Header
            as="h3"
            color="teal"
            textAlign="center"
            style={{ display: "block", margin: "auto", marginTop: "2em" }}
          >
            {img.imageName}
          </Header>

          <Header
            as="h3"
            color="teal"
            textAlign="center"
            style={{ display: "block", margin: "auto", marginTop: "1em" }}
          >
            Categories =>{"  "}
            {img.categories.map((cat, inkey) => (
              <span key={inkey}>{cat} :: </span>
            ))}
          </Header>

          <div>
            <ImageEditor
              includeUI={{
                loadImage: {
                  path: img.url,
                  name: img.imageName,
                },

                menu: ["shape"],
                initMenu: "shape",
                uiSize: {
                  width: "1000px",
                  height: "700px",
                },
                menuBarPosition: "top",
              }}
              cssMaxHeight={500}
              cssMaxWidth={700}
              selectionStyle={{
                cornerSize: 20,
                rotatingPointOffset: 70,
              }}
              usageStatistics={true}
            />
          </div>

          <Form
            size="large"
            onSubmit={(event) => handleSubmit(event, key)}
            style={{ align: "center", overlow: "auto" }}
          >
            <Segment
              stacked
              style={{
                display: "block",
                margin: "auto",
                float: "right",
                marginTop: "-30em",
                marginRight: "5em",
                width: "20%",
                overlow: "auto",
              }}
            >
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
              <Button
                animated
                loading={load}
                style={{ display: "block", margin: "auto", marginTop: "1em" }}
              >
                <Button.Content visible>Upload</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow up" />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
          {Object.entries(errors).length > 0 && (
            <Message
              error
              header="Could Not Upload"
              list={Object.keys(errors).map((key) => errors[key])}
              size="small"
              className="zoomIn"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default withRouter(ImageAnnotation);
