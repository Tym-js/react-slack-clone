import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom"
import firebase from "./firebase"

import "semantic-ui-css/semantic.min.css"
import "./styles.css"

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/")
      }
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
}

const RootwithAuth = withRouter(Root)

const rootElement = document.getElementById("root")
ReactDOM.render(
  <Router>
    <RootwithAuth />
  </Router>,
  rootElement
)
