import React, { Component } from 'react';
import 'antd/dist/antd.css'; // CSS STYLING
import { BrowserRouter as Router } from 'react-router-dom';
import QuizListView from './containers/QuizListView';
import QuizDetailView from './containers/QuizDetailView';
import Login from './auth/Login';
import RedirectRoute from './common/RedirectRoute'
import PrivateRoute from './common/PrivateRoute'


// import axios from 'axios';
// import { Route } from 'react-router-dom';


class App extends Component {
  state = {
    isAuthenticated: null,
  };

  getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  };

  setAuthenticated = () => {
    this.setState({
      isAuthenticated: true
    })
  }

  componentDidMount() {
    let checkCookie = this.getCookie("atn")
    this.setState({
      isAuthenticated: checkCookie == null ? null : true,
      token: checkCookie
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <RedirectRoute isAuthenticated={this.state.isAuthenticated} exact path='/' component={Login} setAuthenticated={this.setAuthenticated} />
          <PrivateRoute token={this.state.token} isAuthenticated={this.state.isAuthenticated} exact path='/quizzes' component={QuizListView} />
          <PrivateRoute token={this.state.token} isAuthenticated={this.state.isAuthenticated} exact path='/quizzes/:slug' component={QuizDetailView} />
        </Router>
      </div>
    );
  }
}

export default App;
