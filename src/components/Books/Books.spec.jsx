import { fireEvent, render, screen } from '@testing-library/react'
import Books from '.'

describe('ToDo component', () => {
  it('should be abel to render the books list', () => {
    render(<Books />)

    expect(screen.getByTestId('books-list')).toBeInTheDocument()
  })

  it('should be able to add a book', () => {
    render(<Books />)

    expect(screen.getByTestId('title-input').value).toBe("")
    expect(screen.getByTestId('author-input').value).toBe("")

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter 2' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'JK Rowling' } })

    fireEvent.click(screen.getByTestId('add-book-button'))

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: '' } })

    expect(screen.getByText('Harry Potter 2 - JK Rowling')).toBeInTheDocument()
  })

  it('should be abel to delete a book', async () => {
    render(<Books />)

    expect(screen.getByTestId('book')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter 2' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'JK Rowling' } })

    const firstBook = screen.getByText('Harry Potter 1 - JK Rowling')
    
    fireEvent.click(screen.getByTestId('add-book-button'))

    const secondBook = screen.getByText('Harry Potter 2 - JK Rowling')

    expect(screen.getAllByTestId('book')).toHaveLength(2)
    expect(firstBook).toBeInTheDocument()
    expect(secondBook).toBeInTheDocument()

    const [buttons] = screen.getAllByTestId('delete-book-button')

    fireEvent.click(buttons)

    expect(screen.getAllByTestId('book')).toHaveLength(1)
    expect(firstBook).not.toBeInTheDocument()
    expect(secondBook).toBeInTheDocument()
  })

  it('should not be able to to add a book with missing information', () => {
    render(<Books />)

    expect(screen.getByTestId('book')).toBeInTheDocument()
    expect(screen.getAllByTestId('book')).toHaveLength(1)

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter 2' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: '' } })

    fireEvent.click(screen.getByTestId('add-book-button'))

    expect(screen.getByTestId('error-message')).toBeInTheDocument()

    expect(screen.getAllByTestId('book')).toHaveLength(1)

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: '' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'JK Rowling' } })

    fireEvent.click(screen.getByTestId('add-book-button'))

    expect(screen.getByTestId('error-message')).toBeInTheDocument()

    expect(screen.getAllByTestId('book')).toHaveLength(1)

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter 2' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'JK Rowling' } })

    fireEvent.click(screen.getByTestId('add-book-button'))

    expect(screen.getByText('Harry Potter 2 - JK Rowling')).toBeInTheDocument()
    expect(screen.getAllByTestId('book')).toHaveLength(2)
  })

  it('should be able to edit a book', () => {
    render(<Books />)

    const firstBook = screen.getByText('Harry Potter 1 - JK Rowling')

    const addButton = screen.getByTestId('add-book-button')
    
    const buttons = screen.getAllByTestId('edit-book-button')
    
    fireEvent.click(buttons[0])  
    
    expect(addButton).not.toBeInTheDocument()  
    expect(screen.getByTestId('cancel-edit-process-button')).toBeInTheDocument()  
    expect(screen.getByTestId('confirm-edit-process-button')).toBeInTheDocument()  

    // simulando processo de edicao cancelado
    fireEvent.click(screen.getByTestId('cancel-edit-process-button'))
    expect(firstBook).toBeInTheDocument()
    
    // simulando uma edicao
    fireEvent.click(buttons[0])

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter 1' } })
    fireEvent.change(screen.getByTestId('author-input'), { target: { value: 'JK Rowling' } })

    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Harry Potter e a Pedra Filosofal' } })

    fireEvent.click(screen.getByTestId('confirm-edit-process-button'))
    expect(screen.getByText('Harry Potter e a Pedra Filosofal - JK Rowling')).toBeInTheDocument()
  })
})