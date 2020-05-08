import React from 'react';

import axios from 'axios';

export default class AnnotatorList extends React.Component {
  state = {
    annotators: []
  }

  componentDidMount() {
    axios.get(`https://image-annotation-backend.herokuapp.com/admin/get-annotators`)
      .then(res => {
        const annotators = res.data;
        this.setState({ annotators });
      })
  }

  render() {
    return (
      <ul>
        { this.state.annotators.map(annotators => <li>{annotators.name}</li>)}
      </ul>
    )
  }
}
export default AnnotatorList;