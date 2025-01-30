import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import MovieContext from '../../context'

class Login extends Component {
  state = {errorMsg: '', username: 'raja', password: 'raja@2021'}

  fillingForm = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  submitForm = (event, updateUsername, updatePassword) => {
    event.preventDefault()

    this.verifyUser(updateUsername, updatePassword)
  }

  verifyUser = async (updateUsername = () => {}, updatePassword = () => {}) => {
    const {history} = this.props
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, 30)
      updatePassword(password)
      updateUsername(username)
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {updatePassword, updateUsername} = value
          return (
            <div className="loginParentCon vh-100 d-flex flex-column justify-content-center">
              <div className="d-flex justify-content-center fixed-top">
                <nav className="navCon pt-4 pb-2">
                  <img
                    src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579395/MovieApp/Group_7399_logo_ruqzom.png"
                    alt="login website logo"
                    className="websiteLogo"
                  />
                </nav>
              </div>
              <div className="loginCon align-self-center text-white">
                <form
                  className="loginFormCon d-flex flex-column"
                  onSubmit={event =>
                    this.submitForm(event, updateUsername, updatePassword)
                  }
                >
                  <h1 className="text-center loginHead h3">Login</h1>
                  <div className="form-group">
                    <label htmlFor="username">USERNAME</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Your Username"
                      name="username"
                      onChange={this.fillingForm}
                      value={username}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.fillingForm}
                      value={password}
                    />
                  </div>
                  <button type="submit" className="btn text-white loginButton">
                    Login
                  </button>
                  <p className="small text-danger mt-1">
                    {errorMsg !== '' && errorMsg}
                  </p>
                </form>
              </div>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}
export default Login
