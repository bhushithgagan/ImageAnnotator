import React, { useState, useEffect } from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Message,
  Input,
  Icon,
} from "semantic-ui-react";
import { ANNGETIMG, ANNUPLOAD } from "../../routes/routes";
import axios from "axios";

function ImageAnnotation({ credentials: { username, password } }) {
  const [categories, setCategories] = useState("");
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCategoriesChange = (event) => setCategories(event.target.value);

  const handleSubmit = (event, key) => {
    console.log(key);
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
      var img = new File([theBlob], images[key].imageName);

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
          let temp = [...images];
          let tmp = temp[key];
          setImages(temp.filter((x) => x != tmp));
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
        });
    }
  };

  const nextImage = (event) => {};

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <div>
      <div style={{ marginLeft: "90%" }}>
        <Button icon labelPosition="right" onClick={nextImage}>
          Next
          <Icon name="right arrow" />
        </Button>
      </div>
      {images.map((img, key) => (
        <div key={key} style={{ marginLeft: "10%", marginTop: "5%" }}>
          <Header
            as="h3"
            color="teal"
            textAlign="center"
            style={{ marginBottom: "2%" }}
          >
            {img.imageName}
          </Header>

          <Header
            as="h3"
            color="teal"
            textAlign="center"
            style={{ marginBottom: "2%" }}
          >
            Categories =>{"  "}
            {img.categories.map((cat, inkey) => (
              <span key={inkey}>{cat} </span>
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
            style={{ float: "right", marginTop: "-17%", marginRight: "10%" }}
          >
            <Segment stacked>
              <Input
                focus
                placeholder="Categories"
                onChange={handleCategoriesChange}
                value={categories}
                style={{ marginTop: "4%" }}
              />
              <Button animated loading={load} style={{ marginLeft: "50%" }}>
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

export default ImageAnnotation;
