import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {v4 as uuidv4} from 'uuid'
import {apiStatusConstants} from '../Home/index'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'

class Popular extends Component {
  state = {popularApiStatus: 'initial', popularVideosList: []}

  componentDidMount() {
    this.getPopularVideos()
  }

  convertNamingConvention = obj => ({
    backdropPath: obj.backdrop_path,
    id: obj.id,
    overview: obj.overview,
    posterPath: obj.poster_path,
    title: obj.title,
  })

  getPopularVideos = async () => {
    this.setState({popularApiStatus: apiStatusConstants.load})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    const data = await response.json()

    if (response.ok) {
      let {results} = data
      results = results.map(obj => this.convertNamingConvention(obj))
      this.setState({
        popularApiStatus: apiStatusConstants.success,
        popularVideosList: results,
      })
    } else {
      this.setState({popularApiStatus: apiStatusConstants.fail})
    }
  }

  renderSuccessView = () => {
    const {popularVideosList} = this.state
    return (
      <div className="popularVideosListCon align-self-center text-white">
        <h1 className="h3 popularHeading">Popular Movies</h1>
        <ul className="list-unstyled flex-wrap d-flex justify-content-between w-100">
          {popularVideosList.map(obj => (
            <MovieCard key={uuidv4()} obj={obj} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="vh-100 d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" testid="loader">
        <Loader type="TailSpin" color="#e50914" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="vh-100 text-white d-flex justify-content-center align-items-center text-center w-100">
      <div className="">
        <img
          src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579396/MovieApp/Background-Complete_failureCase_x9vgpv.png"
          alt="failure view"
          className="failureView"
        />

        <p>Something went wrong. Please try again</p>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={this.getPopularVideos}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  decideWhatToRender = () => {
    const {popularApiStatus} = this.state
    switch (popularApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.fail:
        return this.renderFailureView()
      case apiStatusConstants.load:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popularCon min-vh-100 d-flex flex-column text-white">
        <Header />
        {this.decideWhatToRender()}
        <Footer />
      </div>
    )
  }
}

export default Popular
