import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {obj} = props
  return (
    <li className="col-md-3 mb-2 mt-2 col-6">
      <Link to={`/movies/${obj.id}`}>
        <img
          src={obj.posterPath}
          alt={obj.title}
          className="img-thumbnail h-100"
        />
      </Link>
    </li>
  )
}

export default MovieCard
