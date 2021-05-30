import React, { useState } from 'react'

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const [inputNumber, setInputNumber] = useState(1)

  return (
    <div>
      <h1>Counter</h1>

      <h3 data-testid="counter" className={counter >= 100 ? 'blue' : ''}>{counter}</h3>

      <div>
        <button onClick={() => setCounter(counter - Number(inputNumber))}>-</button>
        <input type="number" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} data-testid="counter-input"/>
        <button onClick={() => setCounter(counter + Number(inputNumber))}>+</button>
      </div>
    </div>
  )
}

export default Counter
