import { fireEvent, render, screen } from '@testing-library/react'
import Loading from '.'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get("http://localhost:3333/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 5,
          title: "Patera Negra",
          year: "2018"
        },
        {
          id: 6,
          title: "Capitã Marvel",
          year: "2019"
        },
        {
          id: 7,
          title: "WandaVision",
          year: "2021"
        },
      ])
    )
  })
)

// inicia o servidor antes do inicio dos testes
beforeAll(() => server.listen())
// desliga o servidor apos completarem os testes
afterAll(() => server.close())
// reseta ao estado inicial do servidor após cada teste.
afterEach(() => server.resetHandlers())

describe('Loading component', () => {
  it('should render loading state at component mount', async () => {
    render(<Loading />)

    // checa o estado inicial (Loading)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('should be able to render a movie list after click button', async () => {
    render(<Loading />)

    fireEvent.click(screen.getByText('Get movies list'))

    const movieFetched = await screen.findAllByTestId('movie-title')
    const specificMovieWasFetched = await screen.findByText('WandaVision')

    expect(movieFetched).toHaveLength(3)
    expect(specificMovieWasFetched).toBeInTheDocument()
  })

  it('should render an error message if the request to the API fails', async () => {
    // criando um funcionamento específico somente neste teste para a rota indicada 
    server.use(
      rest.get("http://localhost:3333/movies", (req, res, ctx) => {
        return res(
          ctx.status(404),
        )
      })
    )

    render(<Loading />)

    fireEvent.click(screen.getByText('Get movies list'))

    const errorResponse = await screen.findByTestId('error')

    expect(errorResponse).toBeInTheDocument()
  })

  it('should disable fetch button when API call was completed', async () => {
    render(<Loading />)

    fireEvent.click(screen.getByText('Get movies list'))

    const movieFetched = await screen.findAllByTestId('movie-title')

    expect(movieFetched).toHaveLength(3)
    
    expect(screen.getByTestId('fetch-button')).toBeDisabled()
  })

  it('should not disable fetch button when API call fails', async () => {
    server.use(
      rest.get("http://localhost:3333/movies", (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json([
            {
              message: "Falhou"
            }
          ])
        )
      })
    )

    render(<Loading />)

    fireEvent.click(screen.getByText('Get movies list'))

    const errorResponse = await screen.findByTestId('error')

    expect(errorResponse).toBeInTheDocument()
    expect(screen.getByTestId('fetch-button')).not.toBeDisabled()
  })
})