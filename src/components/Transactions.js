import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import withAuth from './withAuth';

class Transactions extends Component {
  render() {
    return (
      <Header as='h2'>Transactions for {this.props.user.username}</Header>
    )
  }
}

export default withAuth(Transactions);