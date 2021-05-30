import axios from 'axios'
import React, { useState } from 'react'

const Loading = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3333/movies')

      setMovies(response.data)
      setLoading(false)
      setButtonIsDisabled(true)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={fetchMovies} disabled={buttonIsDisabled} data-testid="fetch-button" >Get movies list</button>

      {loading && <p>Loading</p>}
      {!loading && movies.map(movie => {
        return (
          <div key={movie.id} >
            <strong data-testid="movie-title">{movie.title}</strong>{" "}
            <span>{movie.year}</span>
          </div>
        )
      })}
      {error && <p data-testid="error">Vish: {error}</p>}
    </div>
  )
}

export default Loading
