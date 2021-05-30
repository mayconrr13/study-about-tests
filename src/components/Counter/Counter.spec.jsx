import React from 'react'
import Counter from './index'
import { fireEvent, render, screen } from '@testing-library/react'

//renderização inicial
// value should increase
// value should decrease


describe('Counter component', () => {
  it('renders correctly', () => {
    render(<Counter />)

    expect(screen.getByText('Counter')).toBeInTheDocument() 
  })

  it('counter initially starts with 0', () => {
    render(<Counter />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('input initial value is equal to 1', () => {
    render(<Counter />)

    expect(screen.getByRole('spinbutton', '1')).toBeInTheDocument()
  })

  it('increase +1 when increase button is pressed', () => {
    render(<Counter />)

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByText('1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('decrese -1 when decrease button is pressed', () => {
    render(<Counter />)
 
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByText('-1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('-'))
    expect(screen.getByText('-2')).toBeInTheDocument()
  })

  it('user should be able to change the input value to 5', () => {
    render(<Counter />)

    fireEvent.change(screen.getByTestId('counter-input'), {
      target: {
        value: 5
      }
    })

    expect(screen.getByTestId('counter-input').value).toEqual('5')
  })

  it('should increase +5 when input value is equal to 5', () => {
    render(<Counter />)

    expect(screen.getByTestId("counter").textContent).toBe('0')

    expect(screen.getByTestId('counter-input').value).toBe('1')

    fireEvent.change(screen.getByTestId('counter-input'), {
      target: {
        value: 5
      }
    })

    expect(screen.getByTestId('counter-input').value).toBe('5')

    fireEvent.click(screen.getByText('+'))

    expect(screen.getByTestId("counter").textContent).toBe('5')
  })

  it('should decrease -5 when input value is equal to 5', () => {
    render(<Counter />)

    expect(screen.getByTestId("counter").textContent).toBe('0')

    expect(screen.getByTestId('counter-input').value).toBe('1')

    fireEvent.change(screen.getByTestId('counter-input'), {
      target: {
        value: 5
      }
    })

    expect(screen.getByTestId('counter-input').value).toBe('5')

    fireEvent.click(screen.getByText('-'))

    expect(screen.getByTestId("counter").textContent).toBe('-5')
  })
  
  it('should add blue class when counter value is greater than 100', () => {
    render(<Counter />)

    expect(screen.getByTestId('counter').className).toBe("")

    expect(screen.getByTestId('counter-input').value).toBe('1')

    fireEvent.change(screen.getByTestId('counter-input'), {
      target: {
        value: 50
      }
    })

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('counter').className).toBe("")

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('counter').className).toBe("blue")

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('counter').className).toBe("blue")

    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('counter').className).toBe("blue")

    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('counter').className).toBe("")
  })
})
