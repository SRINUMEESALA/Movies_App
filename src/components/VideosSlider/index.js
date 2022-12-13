/* eslint-disable jsx-a11y/no-static-element-interactions */
import Slider from 'react-slick'
import {useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {FcNext, FcPrevious} from 'react-icons/fc'

import './index.css'

const settings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  autoplay: true,
  autoplaySpeed: 2000,
}

const VideosSlider = props => {
  const slider = useRef(null)
  const {videosList} = props
  return (
    <div className=" d-flex justify-content-center pt-3 pb-3">
      <div className="videosSliderParentCon">
        <button
          type="button"
          className=" nextBtn"
          onClick={() => slider.current.slickNext()}
        >
          <FcNext className="h4 mb-0" />
        </button>
        <button
          type="button"
          className="prevBtn"
          onClick={() => slider.current.slickPrev()}
        >
          <FcPrevious className="h4 mb-0" />
        </button>
        <Slider {...settings} ref={slider}>
          {videosList.map(obj => (
            <div
              className="card shadow mr-3 sliderCard bg-danger"
              key={uuidv4()}
            >
              <Link to={`/movies/${obj.id}`}>
                <img
                  src={obj.posterPath}
                  alt={obj.title}
                  className="w-100 h-100"
                />
                {/* <img src={obj.backdropPath} alt={obj.title} className="w-100" / */}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
export default VideosSlider
