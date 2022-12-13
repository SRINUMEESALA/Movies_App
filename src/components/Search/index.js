import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {v4 as uuidv4} from 'uuid'
import {apiStatusConstants} from '../Home/index'
import './index.css'
import Header from '../Header'
import MovieContext from '../../context'
import MovieCard from '../MovieCard'

class Search extends Component {
  state = {
    searchApiStatus: 'initial',
    resultList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getSearchedVideos()
  }

  convertNamingConvention = obj => ({
    backdropPath: obj.backdrop_path,
    id: obj.id,
    posterPath: obj.poster_path,
    title: obj.title,
  })

  getSearchedVideos = async () => {
    this.setState({searchApiStatus: apiStatusConstants.load})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`,
      options,
    )
    const data = await response.json()

    if (response.ok) {
      let {results} = data
      results = results.map(obj => this.convertNamingConvention(obj))
      this.setState({
        searchApiStatus: apiStatusConstants.success,
        resultList: results,
      })
    } else {
      this.setState({searchApiStatus: apiStatusConstants.fail})
    }
  }

  onClickSearchInput = value => {
    this.setState({searchInput: value}, this.getSearchedVideos)
  }

  renderLoadingView2 = () => (
    <div className="vh-100 d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" testid="loader">
        <Loader type="TailSpin" color="#e50914" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView2 = () => (
    <div className="vh-100 text-white d-flex justify-content-center align-items-center text-center ">
      <div className="">
        <img
          src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579396/MovieApp/alert-triangle_failureCaseVideoItem_bwyuj8.png"
          alt="failure view"
          className="failureView"
        />
        <p>Something went wrong.Please try again</p>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={this.getSearchedVideos}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {resultList, searchInput} = this.state

    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <MovieContext.Consumer>
          {value => {
            console.log(value)
            return (
              <>
                {resultList.length === 0 ? (
                  <div className=" text-white align-self-center">
                    <div className="text-center">
                      <img
                        src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579396/MovieApp/Group_7394_no_search_results_aegkhm.png"
                        alt="no movies"
                        className="noResultsImgSm"
                      />
                      <p className="text-secondary text-center mt-3">
                        Your search for {searchInput} did not find any matches.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ul className="cardsOfSearch list-unstyled flex-wrap d-flex justify-content-start">
                    {resultList.map(obj => (
                      <MovieCard obj={obj} key={uuidv4()} />
                    ))}
                  </ul>
                )}
              </>
            )
          }}
        </MovieContext.Consumer>
      </div>
    )
  }

  decideWhatToRender = () => {
    const {searchApiStatus} = this.state
    switch (searchApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.fail:
        return this.renderFailureView2()
      case apiStatusConstants.load:
        return this.renderLoadingView2()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className=" searchParentCon">
        <Header
          onClickSearchInput={this.onClickSearchInput}
          searchInput={searchInput}
        />
        {this.decideWhatToRender()}
      </div>
    )
  }
}

export default Search
