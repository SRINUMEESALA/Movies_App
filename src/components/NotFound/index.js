import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  redirectToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="notFoundCon d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="text-center">
          <div className="">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
              className="notFound notFoundImg"
            />
          </div>
          <h1 className="h2 mt-3">Lost Your Way?</h1>
          <p>
            we are sorry, the page you requested could not be found Please go
            back to the homepage.
          </p>
          <Link to="/">
            <button type="button" className="btn btn-light">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(NotFound)
