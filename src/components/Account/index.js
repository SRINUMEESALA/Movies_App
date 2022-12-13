import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
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

  logoutPopUp = () => (
    <Popup
      modal
      trigger={
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={this.loggingOut}
        >
          Logout
        </button>
      }
      className="popup-content border border-light"
    >
      {close => (
        <div className="">
          <div className="">
            <p className="h4 text-center">Are you sure, you want to logout?</p>
            <div className="d-flex justify-content-around mt-5">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.loggingOut}
                style={{backgroundColor: '#e50914'}}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )

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

                  <div className="text-right">{this.logoutPopUp()}</div>
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
