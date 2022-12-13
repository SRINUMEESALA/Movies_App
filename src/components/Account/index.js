import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import MovieContext from '../../context'
import Footer from '../Footer'

class Account extends Component {
  loggingOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username, password} = value

          return (
            <div className="min-vh-100 text-white d-flex flex-column justify-content-center p-3">
              <Header />

              <div className="align-self-center accountCon">
                <h1 className="h2 text-light">Account</h1>
                <div className="bg-white">
                  <hr />
                </div>
                <div className="userDetailsCon">
                  <div className="d-flex justify-content-between">
                    <p className="h6 ">Member ship</p>
                    <div className="d-flex flex-column w-50">
                      <p className="">{username}</p>
                      <div className="d-flex flex-row p-0">
                        <p className="">Password </p>
                        <input
                          type="password"
                          className="passwordMasked w-50"
                          disabled
                          defaultValue={password}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <p className="h6 p-0 w-50">Plan details </p>
                    <div className="d-flex flex-column  w-50 align-self-start text-secondary">
                      <p className="">Premium</p>
                      <p className="">Ultra HD</p>
                    </div>
                  </div>
                  <div className="bg-white">
                    <hr />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={this.loggingOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Account
