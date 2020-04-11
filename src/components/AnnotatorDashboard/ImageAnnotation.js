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

function ImageAnnotation(props) {
  const [label, setLabel] = useState("");

  const handleLabelChange = (event) => setLabel(event.target.value);

  const uploadFile = (event) => {
    // filename
    console.log("filename " + event.target.value);

    //file
    console.log("file " + event.target.files[0]);

    console.log(event);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    // axios
    //   .put("", formData, { headers: { "content-type": "multipart/form-data" } })
    //   .then(data => {
    //     console.log("file uploaded");
    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log("error");
    //     console.log(e);
    //   });
  };

  const nextImage = (event) => {
    // axios
    //   .put("", , { headers: { "content-type": "" } })
    //   .then(data => {
    //     console.log("file uploaded");
    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log("error");
    //     console.log(e);
    //   });
  };

  useEffect(() => {});

  return (
    <div>
      <div style={{ marginLeft: "90%" }}>
        <Button icon labelPosition="right" onClick={nextImage}>
          Next
          <Icon name="right arrow" />
        </Button>
      </div>

      <div style={{ marginLeft: "10%", marginTop: "5%" }}>
        <ImageEditor
          includeUI={{
            loadImage: {
              path:
                "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg",
              name: "SampleImage",
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
        style={{ float: "right", marginTop: "-17%", marginRight: "10%" }}
      >
        <Segment stacked>
          <input
            type="file"
            id="file"
            name="filename"
            accept="image/*"
            onChange={uploadFile}
            multiple
          />
          <Input
            focus
            placeholder="Label"
            onChange={handleLabelChange}
            style={{ marginTop: "4%" }}
          />
          <Button animated style={{ marginLeft: "50%" }}>
            <Button.Content visible>Upload</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow up" />
            </Button.Content>
          </Button>
        </Segment>
      </Form>
    </div>
  );
}

export default ImageAnnotation;
