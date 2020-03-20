import React from "react";
import { Result, Button, Row, Col } from "antd";

function NotFound() {
  return (
    <div style={{ marginLeft: "45%", marginTop: "12%" }}>
      <Row align="middle" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Col>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
          />
        </Col>
      </Row>
    </div>
  );
}

export default NotFound;
