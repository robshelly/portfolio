import React, { Component } from 'react';
import { Segment, Form, Header, Button } from 'semantic-ui-react';
import AuthService from './AuthService';

class Login extends Component {
  constructor() {
    super();
    this.state=({
      username: '',
      password: '',
      usernamenameRequiredWarning: false,
      passwordRequiredWarning: false,
    })
    // this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/app');
  }

  handleChange = (event, {name, value}) => {
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();

    // If any fields are blank, set a warning and return
    if (!username) this.setState({usernameRequiredWarning: true});
    if (!password) this.setState({passwordRequiredWarning: true});
    if (!username || !password) {
      return;
    }

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/app');
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    return (
      <Segment color={'teal'}>
        <Header as='h3'color='blue'>Login</Header>
        <Form>
          <Form.Input
            required={this.state.usernameRequiredWarning}
            error={this.state.usernameRequiredWarning}
            label='Username'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Input
            required={this.state.passwordRequiredWarning}
            error={this.state.passwordRequiredWarning}
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button color='yellow' type='submit' onClick={this.handleFormSubmit}>Login</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;