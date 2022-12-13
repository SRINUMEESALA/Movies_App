/* eslint-disable import/no-cycle */
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import TrendingSlider from '../TrendingSlider'
import OriginalVideosSlider from '../OriginalVideosSlider'
import PosterOfHome from '../PosterOfHome'
import TopRatedSlider from '../TopRatedSlider'

export const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}
const Home = () => (
  <div className="d-flex flex-column text-white min-vh-100">
    <Header />
    <PosterOfHome />
    <TrendingSlider />
    <TopRatedSlider />
    <OriginalVideosSlider />
    <Footer />
  </div>
)

export default Home

// import {Component} from 'react'
// /* eslint-disable import/no-cycle */

// import Loader from 'react-loader-spinner'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
// import Cookies from 'js-cookie'
// import './index.css'
// import Header from '../Header'
// import Footer from '../Footer'
// import TrendingSlider from '../TrendingSlider'
// import OriginalVideosSlider from '../OriginalVideosSlider'
// import PosterOfHome from '../PosterOfHome'

// export const apiStatusConstants = {
//   success: 'success',
//   fail: 'fail',
//   load: 'load',
// }

// class Home extends Component {
//   state = {
//     originalVideosAPIstatus: 'initial',
//     originalVideosList: [],
//   }

//   componentDidMount() {
//     this.getOriginalVideos()
//   }

//   convertNamingConvention = obj => ({
//     backdropPath: obj.backdrop_path,
//     id: obj.id,
//     overview: obj.overview,
//     posterPath: obj.poster_path,
//     title: obj.title,
//   })

//   getOriginalVideos = async () => {
//     this.setState({originalVideosAPIstatus: apiStatusConstants.load})

//     const jwtToken = Cookies.get('jwt_token')
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }
//     const response = await fetch(
//       'https://apis.ccbp.in/movies-app/originals',
//       options,
//     )
//     const data = await response.json()

//     if (response.ok) {
//       let {results} = data
//       results = results.map(obj => this.convertNamingConvention(obj))
//       this.setState({
//         originalVideosAPIstatus: apiStatusConstants.success,
//         originalVideosList: results,
//       })
//     } else {
//       this.setState({originalVideosAPIstatus: apiStatusConstants.fail})
//     }
//   }

//   renderLoadingView = () => (
//     <div
//       className="vh-100 d-flex align-items-center justify-content-center w-100 "
//       testid="loader"
//     >
//       <div className="loader-container mt-5">
//         <Loader type="TailSpin" color="#e50914" height={50} width={50} />
//       </div>
//     </div>
//   )

//   renderFailureView = () => (
//     <div className="vh-100 text-white d-flex justify-content-center align-items-center text-center w-100">
//       <div className="">
//         <img
//           src="https://res.cloudinary.com/radhekrishn/image/upload/v1670579396/MovieApp/Background-Complete_failureCase_x9vgpv.png"
//           alt="failure view"
//           className="failureView"
//         />

//         <p>Something went wrong.Please try again</p>
//         <button
//           type="button"
//           className="btn btn-outline-light"
//           onClick={this.getOriginalVideos}
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   )

//   renderSuccessView = () => (
//     <div className="d-flex flex-column text-white min-vh-100">
//       <Header />
//       <PosterOfHome isAllReady={this.isAllReady} />
//       <TrendingSlider />
//       <OriginalVideosSlider />
//       <Footer />
//     </div>
//   )

//   render() {
//     // const {originalVideosAPIstatus} = this.state
//     // switch (originalVideosAPIstatus) {
//     //   case apiStatusConstants.success:
//     //     return this.renderSuccessView()
//     //   case apiStatusConstants.fail:
//     //     return this.renderFailureView()
//     //   case apiStatusConstants.load:
//     //     return this.renderLoadingView()
//     //   default:
//     //     return null
//     // }
//     return this.renderSuccessView()
//   }
// }

// export default Home
