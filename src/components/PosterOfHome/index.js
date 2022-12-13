/* eslint-disable import/no-cycle */

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {apiStatusConstants} from '../Home/index'
import './index.css'

class PosterOfHome extends Component {
  state = {
    originalVideosAPIstatus: 'initial',
    originalVideosList: [],
  }

  componentDidMount() {
    this.getOriginalVideos()
  }

  convertNamingConvention = obj => ({
    backdropPath: obj.backdrop_path,
    id: obj.id,
    overview: obj.overview,
    posterPath: obj.poster_path,
    title: obj.title,
  })

  getOriginalVideos = async () => {
    this.setState({originalVideosAPIstatus: apiStatusConstants.load})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )
    const data = await response.json()

    if (response.ok) {
      let {results} = data
      results = results.map(obj => this.convertNamingConvention(obj))
      this.setState({
        originalVideosAPIstatus: apiStatusConstants.success,
        originalVideosList: results,
      })
    } else {
      this.setState({originalVideosAPIstatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView2 = () => (
    <div
      className="vh-100 d-flex align-items-center justify-content-center w-100 "
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

        <p>Something went wrong.Please try again</p>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={this.getOriginalVideos}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {originalVideosList} = this.state
    const randObj =
      originalVideosList[Math.round(Math.random() * originalVideosList.length)]
    const imgUrl = randObj !== undefined ? randObj.backdropPath : ''
    return (
      <div
        className=" BannerPlsCard d-flex flex-column"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <div className="posterCard d-flex flex-column align-self-md-center justify-content-md-center justify-content-end">
          <div className="cardConBanner ">
            <div className="card-body text-white">
              <h1 className="h3">{randObj !== undefined && randObj.title}</h1>
              <h1 className="card-text h5">
                {randObj !== undefined && randObj.overview}
              </h1>
              <button className="btn btn-light pl-4 pr-4" type="button">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {originalVideosAPIstatus} = this.state
    switch (originalVideosAPIstatus) {
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

export default PosterOfHome
