/* eslint-disable import/no-cycle */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import VideosSlider from '../VideosSlider'
import {apiStatusConstants} from '../Home/index'
import './index.css'

class TopRatedSlider extends Component {
  state = {topRatedApiStatus: 'initial', topRatedList: []}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  convertNamingConvention = obj => ({
    backdropPath: obj.backdrop_path,
    id: obj.id,
    overview: obj.overview,
    posterPath: obj.poster_path,
    title: obj.title,
  })

  getTopRatedMovies = async () => {
    this.setState({topRatedApiStatus: apiStatusConstants.load})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/top-rated-movies',
      options,
    )
    const data = await response.json()

    if (response.ok) {
      let {results} = data
      results = results.map(obj => this.convertNamingConvention(obj))
      this.setState({
        topRatedApiStatus: apiStatusConstants.success,
        topRatedList: results,
      })
    } else {
      this.setState({topRatedApiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView2 = () => (
    <div
      className=" d-flex align-items-center justify-content-center w-100 "
      testid="loader"
    >
      <div className="loader-container mt-5">
        <Loader type="TailSpin" color="#e50914" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView2 = () => (
    <div className="text-white d-flex justify-content-center align-items-center text-center w-100 border p-5">
      <div className="">
        <img
          src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579396/MovieApp/alert-triangle_failureCaseVideoItem_bwyuj8.png"
          alt="failure view"
          className="failureView"
        />

        <p>Something went wrong. Please try again</p>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={this.getTopRatedMovies}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {topRatedList} = this.state
    return (
      <div className="trendingCon align-self-center SliderContainer">
        <h1 className="h3 mt-3 mb-1">Top Rated</h1>
        <VideosSlider videosList={topRatedList} />
      </div>
    )
  }

  render() {
    const {topRatedApiStatus} = this.state
    switch (topRatedApiStatus) {
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
}

export default TopRatedSlider
