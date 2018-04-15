import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import withAuth from './withAuth';

class Holdings extends Component {
  render() {
    return (
      <Header as='h2'>Holdings for {this.props.user.username}</Header>
    )
  }
}

export default withAuth(Holdings);