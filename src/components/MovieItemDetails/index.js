/* eslint-disable import/no-cycle */

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import format from 'date-fns/format'
import {apiStatusConstants} from '../Home/index'
import './index.css'
import Footer from '../Footer'
import Header from '../Header'
import VideoPlayer from '../VideoPlayer'

class MovieItemDetails extends Component {
  state = {
    movieItemDetailsApiStatus: 'initial',
    movieDetails: {},
    showPlayer: false,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  convertNamingConvention = obj => ({
    backdropPath: obj.backdrop_path,
    id: obj.id,
    overview: obj.overview,
    posterPath: obj.poster_path,
    title: obj.title,
  })

  getMovieDetails = async (movieId = '') => {
    this.setState({movieItemDetailsApiStatus: apiStatusConstants.load})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    let url
    if (movieId === '') {
      url = `https://apis.ccbp.in/movies-app/movies/${id}`
    } else {
      url = `https://apis.ccbp.in/movies-app/movies/${movieId}`
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      // eslint-disable-next-line camelcase
      const {movie_details} = data
      const movieDetails = {
        adult: movie_details.adult,
        backdropPath: movie_details.backdrop_path,
        budget: movie_details.budget,
        genres: movie_details.genres,
        id: movie_details.id,
        overview: movie_details.overview,
        posterPath: movie_details.poster_path,
        releaseDate: movie_details.release_date,
        runtime: movie_details.runtime,
        similarMovies: movie_details.similar_movies,
        spokenLanguages: movie_details.spoken_languages,
        title: movie_details.title,
        voteAverage: movie_details.vote_average,
        voteCount: movie_details.vote_count,
      }
      this.setState({
        movieDetails,
        movieItemDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({movieItemDetailsApiStatus: apiStatusConstants.fail})
    }
  }

  renderFailureView2 = () => {
    const {movieDetails} = this.state
    return (
      <div className="vh-100 text-white d-flex justify-content-center align-items-center text-center">
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
            onClick={() => this.getMovieDetails(movieDetails.id)}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView2 = () => (
    <div className="vh-100 d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5">
        <Loader type="TailSpin" color="#e50914" height={50} width={50} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, showPlayer} = this.state
    const {
      backdropPath,
      budget,
      runtime,
      adult,
      overview,
      releaseDate,
      title,
      genres,
      spokenLanguages,
      voteAverage,
      voteCount,
      similarMovies,
    } = movieDetails

    const runtimeIt = parseInt(runtime)
    return (
      <div className="d-flex flex-column">
        <Header />
        {showPlayer ? (
          <VideoPlayer />
        ) : (
          <div
            className="moviesDetailsParentCon BannerPlsCard d-flex flex-column "
            style={{
              backgroundImage: `url(${backdropPath})`,
            }}
          >
            <div className="posterCard d-flex flex-column align-self-md-center justify-content-md-center justify-content-end ">
              <div className="cardConBanner ">
                <div className="card-body text-white">
                  <h1 className="h3">{title}</h1>
                  <div className="d-flex">
                    <p className="mr-3">
                      {`${Math.round(runtimeIt / 60)}h ${Math.round(
                        runtimeIt % 60,
                      )}m`}
                    </p>
                    <p className="mr-3 sensorship border border-white font-weight-bold">
                      {adult ? 'A' : ' U/A'}
                    </p>
                    <p className="">{format(new Date(releaseDate), 'yyyy')}</p>
                  </div>
                  <p className="card-text">{overview}</p>
                  <button
                    className="btn btn-light pl-4 pr-4"
                    type="button"
                    onClick={() => this.setState({showPlayer: true})}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-white movieInfoCon align-self-center row pt-3">
          <div className="col-md-3 col-4 d-flex justify-content-start flex-column">
            <>
              <h1 className="h5">Genres</h1>
              <ul className="list-unstyled">
                {genres.map(obj => (
                  <li className="" key={obj.id}>
                    <p>{obj.name}</p>
                  </li>
                ))}
              </ul>
            </>
          </div>
          <div className="col-md-3 d-flex col-4 justify-content-start flex-column ">
            <>
              <h1 className="h5">Audio Available</h1>
              <ul className="list-unstyled">
                {spokenLanguages.map(obj => (
                  <li className="" key={obj.id}>
                    <p> {obj.english_name}</p>
                  </li>
                ))}
              </ul>
            </>
          </div>

          <div className="col-md-3 col-4 d-flex justify-content-start flex-column">
            <ul className="list-unstyled">
              <li className="">
                <h1 className="h5">Rating Count</h1>
                <p>{voteCount}</p>
              </li>
              <li className="">
                <h1 className="h5">Rating Average</h1>
                <p>{voteAverage}</p>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-4 d-flex justify-content-start flex-column">
            <ul className="list-unstyled">
              <li className="">
                <h1 className="h5">Budget</h1>
                <p>{budget}</p>
              </li>
              <li className="">
                <h1 className="h5">Release Date</h1>
                <p>{format(new Date(releaseDate), 'dd MMMM yyyy')}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className=" text-white movieInfoCon align-self-center">
          <div className="">
            <h1 className="h3">More like this</h1>
            <ul className="list-unstyled d-flex flex-wrap">
              {similarMovies.map(obj => (
                <li key={obj.id} className="col-md-3 col-6 p-2 mb-3">
                  <Link to={`/movies/${obj.id}`} className="h-100">
                    <div className="h-100">
                      <img
                        src={obj.poster_path}
                        alt={obj.title}
                        className="w-100 rounded h-100"
                        onClick={() => this.getMovieDetails(obj.id)}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const {movieItemDetailsApiStatus} = this.state
    switch (movieItemDetailsApiStatus) {
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

export default MovieItemDetails
