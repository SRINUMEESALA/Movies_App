import React from 'react'

const MovieContext = React.createContext({
  activeRoute: '',
  updateActiveRoute: () => {},
  username: '',
  password: '',
  updateUsername: () => {},
  updatePassword: () => {},
})

export default MovieContext
