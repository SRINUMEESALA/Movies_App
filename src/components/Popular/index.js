import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ReactPaginate from 'react-paginate'
import {v4 as uuidv4} from 'uuid'
import {apiStatusConstants} from '../Home/index'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'

const noOfCardsPerPage = 8
class Popular extends Component {
  state = {
    popularApiStatus: 'initial',
    popularVideosList: [],
    popularPaginationList: [],
  }

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
      'https://apis.ccbp.in/movies-app/popular-movies?offset=0&limit=5',
      options,
    )
    const data = await response.json()

    if (response.ok) {
      let {results} = data
      results = results.map(obj => this.convertNamingConvention(obj))
      this.setState({
        popularApiStatus: apiStatusConstants.success,
        popularVideosList: results,
        popularPaginationList: results.slice(0, noOfCardsPerPage),
      })
    } else {
      this.setState({popularApiStatus: apiStatusConstants.fail})
    }
  }

  handlePageClick = data => {
    const {popularVideosList} = this.state
    const pageNumber = data.selected + 1
    const startIndex = pageNumber * noOfCardsPerPage - noOfCardsPerPage
    const finalIndex = pageNumber * noOfCardsPerPage
    const pagedData = popularVideosList.slice(startIndex, finalIndex)

    this.setState({
      popularPaginationList: pagedData,
    })
  }

  renderSuccessView = () => {
    const {popularPaginationList, popularVideosList} = this.state
    const totalPagesCount = Math.ceil(
      popularVideosList.length / noOfCardsPerPage,
    )

    return (
      <div className="popularVideosListCon align-self-center text-white">
        <h1 className="h3 popularHeading">Popular Movies</h1>
        <ul className="list-unstyled flex-wrap d-flex justify-content-between w-100">
          {popularPaginationList.map(obj => (
            <MovieCard key={uuidv4()} obj={obj} />
          ))}
        </ul>
        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={totalPagesCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-link"
            nextLinkClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="vh-100 d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5">
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
