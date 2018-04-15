import React, { Component } from 'react';
import { Segment, Grid, Header, List } from 'semantic-ui-react'

import AuthService from './AuthService';

import Login from './Login'
import SignUp from './SignUp'

class Home extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render() {
    return (
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>

              <Segment color='teal'>
                <Header as='h2' color='blue'>Sign Up Now</Header>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                <List divided relaxed>
                  <List.Item>
                    <List.Icon color='green' name='chart area' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>View current stock prices</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color='green' name='history' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header >Records your full transaction history</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color='green' name='euro' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header >Convert to many currencies</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon color='green' name='bitcoin' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header >Track your cyptocurrency holdings</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
              </Segment>

            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>

              <Login history={this.props.history}/>
              <SignUp history={this.props.history}/>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      
    )
  }
}

export default Home;