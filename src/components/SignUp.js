import React, { Component } from 'react';
import { Segment, Header, Button, Form } from 'semantic-ui-react';

const initialFormState = {
  username: '',
  password: '',
  password2: '',
  usernamenameRequiredWarning: false,
  passwordRequiredWarning: false,
  password2RequiredWarning: false
}

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = (initialFormState)
  }

  handleChange = (event, {name, value}) => {
    var warningKey = name + 'RequiredWarning'
    this.setState({ [warningKey]: false })
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    var password2 = this.state.password2.trim();

    // If any fields are blank, set a warning and return
    if (!username) this.setState({usernameRequiredWarning: true});
    if (!password) this.setState({passwordRequiredWarning: true});
    if (!password2) this.setState({password2RequiredWarning: true});
    if (!username || !password || !password2) {
      return;
    }

    this.props.submitHandler(username, password, password);
  }

  render() {
    return (
      <Segment color={'teal'}>
        <Header as={'h3'} color={'blue'}>Sign Up</Header>
        <Form>
          <Form.Input
            required={this.state.usernameRequiredWarning}
            error={this.state.usernameRequiredWarning}
            fluid label='Username'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}/>
          <Form.Input
            required={this.state.passwordRequiredWarning}
            error={this.state.passwordRequiredWarning}
            fluid label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}/>
          <Form.Input
            required={this.state.password2RequiredWarning}
            error={this.state.password2RequiredWarning}
            label='Confirm Password'
            placeholder='Password'
            name='password2'
            type='password'
            value={this.state.password2}
            onChange={this.handleChange}/>
          <Button color='yellow' type='submit' onClick={this.handleSubmit}>Sign Up</Button>
        </Form>
      </Segment>
    )
  }
}


class SignUp extends Component {
  handleSubmit = () => {
    console.log("Sign Up")
  }

  render () {
    return (
      <div>
        <SignUpForm
          submitHandler={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SignUp;