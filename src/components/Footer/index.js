import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center footerCon">
        <div className="d-flex flex-column">
          <ul className="list-unstyled d-flex footerIcon">
            <li>
              <button type="button">
                <FaGoogle />
              </button>
            </li>
            <li>
              <button type="button">
                <FaTwitter />
              </button>
            </li>
            <li>
              <button type="button">
                <FaInstagram />
              </button>
            </li>
            <li className="mr-0">
              <button type="button">
                <FaYoutube />
              </button>
            </li>
          </ul>
          <p className="h6 text-center text-white">Contact us</p>
        </div>
      </div>
    )
  }
}

export default Footer
