import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import App from './App';
import Home from './components/Home';
import Test from './components/test';

ReactDOM.render(
  <Segment basic>
    <Segment inverted color='teal'>
      <Header as='h1'> Shares Portfolio</Header>
    </Segment>
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app" component={App} />
        <Route path="/test" component={Test} />
        </Switch>
      </div>
    </Router>
  </Segment>
  , document.getElementById('root')
);
registerServiceWorker();
