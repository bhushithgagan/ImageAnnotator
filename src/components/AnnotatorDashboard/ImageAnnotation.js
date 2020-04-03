import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
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
  useEffect(() => {});
  return (
    <div>
      <CanvasDraw
        brushColor="rgba(0,0,0)"
        imgSrc="https://ichef.bbci.co.uk/wwfeatures/live/976_549/images/live/p0/7z/n7/p07zn7p7.jpg"
      />
      <Input focus placeholder="Label" onChange={handleLabelChange} />
      <Button animated>
        <Button.Content visible>Upload</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow up" />
        </Button.Content>
      </Button>
    </div>
  );
}

export default ImageAnnotation;
