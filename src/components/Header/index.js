import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineManageSearch} from 'react-icons/md'

import './index.css'
import MovieContext from '../../context'

class Header extends Component {
  state = {searchInput: ''}

  componentDidMount() {
    const {searchInput} = this.props
    this.setState({searchInput})
  }

  callOnChangeSearchInput = event => {
    const {onClickSearchInput} = this.props
    this.setState({searchInput: event.target.value})
    if (event.target.value === '') {
      onClickSearchInput('')
    }
  }

  sendToSearch = () => {
    const {onClickSearchInput} = this.props
    const {searchInput} = this.state
    onClickSearchInput(searchInput)
  }

  render() {
    const {searchInput} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {activeRoute, updateActiveRoute} = value
          console.log(activeRoute)
          return (
            <div className="navParentContainer fixed-top">
              <nav className="navContainer navbar navbar-dark navbar-expand-lg m-auto text-white font-weight-bold">
                <Link
                  to="/"
                  className=""
                  onClick={() => updateActiveRoute('Home')}
                >
                  <img
                    src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579395/MovieApp/Group_7399_logo_ruqzom.png"
                    alt="website logo"
                    className="websiteLogoInHeader"
                  />
                </Link>
                {activeRoute === 'Search' ? (
                  <div className="mr-2 input-group d-flex align-self-center border rounded border-light bg-dark w-50 ml-auto d-md-none">
                    <input
                      type="search"
                      className="inputSm form-control bg-dark border-0 text-white p-0 pl-2 "
                      onChange={this.callOnChangeSearchInput}
                      value={searchInput}
                    />
                    <div className="input-group-append input-group-text  bg-dark border-0 p-1 pl-2 pr-2 searchConSm">
                      <button
                        type="button"
                        className="button"
                        testid="searchButton"
                        onClick={() => {
                          this.sendToSearch()
                          updateActiveRoute('Search')
                        }}
                      >
                        <HiOutlineSearch className="mb-0 h5  text-info" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/search" className="nav-link ml-auto d-md-none">
                    <button
                      type="button"
                      className="button"
                      testid="searchButton"
                      onClick={() => updateActiveRoute('Search')}
                    >
                      <HiOutlineSearch className="mb-2 h6  mt-2 text-white" />
                    </button>
                  </Link>
                )}

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => updateActiveRoute({activeRoute})}
                >
                  <span className="">
                    <MdOutlineManageSearch />
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse text-center"
                  id="navbarNav"
                >
                  <ul className="navbar-nav m-auto d-flex flex-row justify-content-around navbarSm">
                    <li className="nav-item active">
                      <Link
                        to="/"
                        className={
                          activeRoute === 'Home'
                            ? 'nav-link link text-warning'
                            : 'nav-link link'
                        }
                        onClick={() => updateActiveRoute('Home')}
                      >
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link
                        to="/popular"
                        className={
                          activeRoute === 'Popular'
                            ? 'nav-link link text-warning'
                            : 'nav-link link'
                        }
                        onClick={() => updateActiveRoute('Popular')}
                      >
                        <span>Popular</span>
                      </Link>
                    </li>
                    <li
                      className="nav-item d-md-none active"
                      onClick={() => updateActiveRoute('Account')}
                    >
                      <Link
                        to="/account"
                        className={
                          activeRoute === 'Account'
                            ? 'text-warning nav-link link'
                            : 'nav-link link'
                        }
                      >
                        <span>Account</span>
                      </Link>
                    </li>
                  </ul>
                  <div className=" d-none d-md-block">
                    <ul className="navbar-nav">
                      {activeRoute === 'Search' ? (
                        <li className="input-group d-flex align-self-center border rounded border-light bg-dark">
                          <input
                            type="search"
                            className="form-control bg-dark border-0 text-white"
                            onChange={this.callOnChangeSearchInput}
                            value={searchInput}
                          />
                          <div className="input-group-append input-group-text  bg-dark border-0 p-1 pl-2 pr-2">
                            <button
                              type="button"
                              className="button"
                              testid="searchButton"
                              onClick={() => {
                                this.sendToSearch()
                                updateActiveRoute('Search')
                              }}
                            >
                              <HiOutlineSearch className="mb-0 h5  text-info" />
                            </button>
                          </div>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <Link to="/search" className="nav-link">
                            <button
                              type="button"
                              className="button"
                              testid="searchButton"
                              onClick={() => updateActiveRoute('Search')}
                            >
                              <HiOutlineSearch className="mb-0 h5  mt-2 text-white" />
                            </button>
                          </Link>
                        </li>
                      )}

                      <li className="nav-item active">
                        <Link to="/account" className="nav-link ">
                          <div className="">
                            <button
                              type="button"
                              className={
                                activeRoute === 'Account'
                                  ? 'button text-warning'
                                  : 'button'
                              }
                              testid="searchButton"
                              onClick={() => updateActiveRoute('Account')}
                            >
                              <img
                                src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579397/MovieApp/Group_profile2_mbvxm0.png"
                                alt="profile"
                                className="profile rounded-circle border border-info"
                              />
                            </button>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Header
