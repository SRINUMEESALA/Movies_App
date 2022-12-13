import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import Popular from './components/Popular'
import Account from './components/Account'
import MovieContext from './context'

class App extends Component {
  state = {activeRoute: 'Home', password: '', username: ''}

  updateActiveRoute = route => {
    this.setState({activeRoute: route})
  }

  updateUsername = username => {
    this.setState({username})
  }

  updatePassword = password => {
    this.setState({password})
  }

  render() {
    const {activeRoute, password, username} = this.state
    return (
      <MovieContext.Provider
        value={{
          activeRoute,
          updateActiveRoute: this.updateActiveRoute,
          username,
          password,
          updateUsername: this.updateUsername,
          updatePassword: this.updatePassword,
        }}
      >
        <div className="appCon">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/movies/:id"
              component={MovieItemDetails}
            />
            <ProtectedRoute exact path="/search" component={Search} />
            <ProtectedRoute exact path="/popular" component={Popular} />
            <ProtectedRoute exact path="/account" component={Account} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </MovieContext.Provider>
    )
  }
}
export default App
