import React, { Component} from 'react';


import { history } from "./_helpers/history";

//routing
import { Route, Router, Switch } from 'react-router-dom';

import Login from "./_components/auth/login";
import { PrivateRout } from "./_privateRoute/privaterout";
import Dashboard from "./_components/dashboard/dashboard";
import Create_User from "./_components/users/create-user";
import List_User from "./_components/users/list-user";


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/auth/login" component={Login} />

          <PrivateRout exact path="/dashboard" component={Dashboard} />
          <PrivateRout exact path="/users/create-user" component={Create_User} />
          <PrivateRout exact path="/users/list-user" component={List_User} />


          <Route exact path="*" component={Login} />

        </Switch>
      </Router>
    );
  }
}


export default App;
