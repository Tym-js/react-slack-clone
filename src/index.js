import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Spinner from "./Spinner"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom"
import rootReducer from "./reducers/index"
import { setUser, clearUser } from "./actions/index"

import { createStore } from "redux"
import { Provider, connect } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"

import firebase from "./firebase"

import "semantic-ui-css/semantic.min.css"
import "./styles.css"

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.history.push("/")
      } else {
        this.props.clearUser()
        this.props.history.push("/login")
      }
    })
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})
const RootwithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser, clearUser }
  )(Root)
)

const rootElement = document.getElementById("root")
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootwithAuth />
    </Router>
  </Provider>,
  rootElement
)
