import React, { useState } from 'react'

const Books = () => {
  const [bookList, setBookList] = useState([{
    id: 1,
    title: 'Harry Potter 1',
    author: 'JK Rowling'
  }])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const [isInEditionProcess, setIsInEditionProcess] = useState(false)
  const [bookToEditId, setBookToEditId] = useState(null)

  const handleAddNewBook = (title, author) => {
    setError('')

    if (!title || !author) {
      setError('Missing information')
      return
    }

    setBookList([...bookList, {
      id: Number((Math.random() * 1000).toFixed(0)),
      title,
      author
    }])

    setTitle('')
    setAuthor('')
  }

  const handleDeleteBook = (id) => {

    const updatedBookList = bookList.filter(book => book.id !== id)

    setBookList(updatedBookList)
  }

  const handleEditBook = (id) => {
    const selectedBook = bookList.filter(book => book.id === id)
    // console.log(selectedBook)
    
    setBookToEditId(id)
    setIsInEditionProcess(true)
    setTitle(selectedBook[0].title)
    setAuthor(selectedBook[0].author)
  }

  const handleCancelEdition = () => {
    setIsInEditionProcess(false)
    setTitle('')
    setAuthor('')
  }
  
  const handleCompleteEdition = (title, author) => {
    const updatedBookList = bookList.map(book => {
      if (bookToEditId === book.id) {
        book.title = title
        book.author = author
        return book
      }

      return book
    })

    setBookList([...updatedBookList])
    setBookToEditId(null)
    setTitle('')
    setAuthor('')

    setIsInEditionProcess(false)
  }

  return (
    <>
      <div>
        <input data-testid="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input data-testid="author-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        {error && <p data-testid="error-message" >Error</p>}
      </div>

      {isInEditionProcess ? (
        <>
          <button data-testid="cancel-edit-process-button" onClick={handleCancelEdition} >Cancel</button>
          <button data-testid="confirm-edit-process-button" onClick={() => handleCompleteEdition(title, author)} >Confirm</button>
        </>
      ) : (
        <button data-testid="add-book-button" onClick={() => handleAddNewBook(title, author)} >Add a book</button>
      )}

      <ul data-testid="books-list">
        {bookList && bookList.map(book => {
          return (
            <li key={`${book.id} - ${book.title}`} data-testid="book" >
              <span>{`${book.title} - ${book.author}`}</span>
              <button data-testid="delete-book-button" onClick={() => handleDeleteBook(book.id)}  >Delete</button>
              <button data-testid="edit-book-button" onClick={() => handleEditBook(book.id)}  >Edit</button>
            </li>
          )
        } )}
      </ul>
    </>
  )
}

export default Books
