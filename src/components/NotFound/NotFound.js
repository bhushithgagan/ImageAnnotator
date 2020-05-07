import React from "react";
import { Message, Grid, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

function NotFound() {
  return (
    <Grid
      textAlign="center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      verticalAlign="middle"
    >
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 500 }}>
          <Message color="teal" size="massive" negative>
            <Message.Header> Page Not Found </Message.Header>
            <p>OOPS! The page you were searching for could not be found!</p>
          </Message>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Link to="/">
          <Button color="green">
            <Button.Content visible>Go Home</Button.Content>
          </Button>
        </Link>
      </Grid.Row>
    </Grid>
  );
}

export default withRouter(NotFound);
