import React , {useState, useEffect}from 'react';
import axios from 'axios';
import { Header ,Card, Grid, GridColumn, Container} from 'semantic-ui-react'
import { GETADANN, GETADMINDETS } from "../../routes/routes";
import "./AnnotatorList.css";


export default function AnnotatorList() {
    const [annotators,setAnnotators] = useState([]);
    const [admin,setAdmin] = useState({});

    

    useEffect(() => {
      axios.get(GETADANN, {
        withCredentials: false,
          auth: {
            username: "admin",
            password: "admin",
          },
        })
      .then(res => {
        setAnnotators(res.data);
        console.log(res.data);  
      
      axios.get(GETADMINDETS, {
        withCredentials: false,
          auth: {
              username: "admin",
              password: "admin",
            },
        })
      .then(res => {
        setAdmin(res.data);
          return res;
        })
        .then(res => {
          console.log(annotators);
          console.log(res.data);
        });
      });
    }, []);
      
    return (
    <div>
      <Container>
      <Header as='h1' textAlign='center' style={{color:"teal"}}>
        Welcome to Annotator Details!
      </Header>
      <Card.Group centered itemsPerRow={4}>
        {annotators.map((ann,key) => {
          return (
              //<Grid.Row row = {ann} divided>
                //<Grid.Column>
                <Card className="grow"
                  raised
                  size="mini"
                  image="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                  color="teal"
                  header= {ann.name}
                  meta= {ann.email}
                  description={"Number of images annotated by " + ann.name + ": " +"\n"+ ann.num_images_annotated + " \n " + " Created annotator account on " + ann.created_on}
                  style={{ marginTop: "2%", maxWidth: "100%" , marginLeft: "1%"}}
                />
              //</Grid.Column>
          //</Grid.Row>
            )
          }

   )}

        </Card.Group>
  </Container>
    </div>
  )}




