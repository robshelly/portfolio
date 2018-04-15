import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Menu } from 'semantic-ui-react';

import Holdings from './components/Holdings' 
import Transactions from './components/Transactions';

import AuthService from './components/AuthService';
import withAuth from './components/withAuth';

const Auth = new AuthService();

class AppMenu extends Component {
  constructor(props) {
    super(props)
    this.state = ({activeItem: 'holdings'})
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/');
  }
  
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name === 'holdings') {
      this.props.history.replace('/app');
    } else {
      this.props.history.replace(`/app/${name}`);
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted color='blue'>
        <Menu.Item name='holdings' active={activeItem === 'holdings'} onClick={this.handleItemClick}>
          Holdings
        </Menu.Item>

        <Menu.Item name='transactions' active={activeItem === 'transactions'} onClick={this.handleItemClick}>
          Transations
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item onClick={this.handleLogout}>
            Log Out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/app/' component={Holdings} />
          <Route path='/app/transactions' component={Transactions} />
        </Switch>
      </div>
    );
  }
}

class App extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/');
  }

  render() {
    return (
      <div>
        <AppMenu history={this.props.history}/>
        <Main />
      </div>
    );
  }
}

export default withAuth(App);