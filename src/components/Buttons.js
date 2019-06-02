import React from 'react'
import { ButtonConsumer } from '../containers/App'

export default function Text (props) {
  return (
    <ButtonConsumer>
      {values => (
        <>
          <button onClick={() => values.dispatch({ type: 'increment' })}>
          +
          </button>
          <button onClick={() => values.dispatch({ type: 'decrement' })}>
          -
          </button>
        </>
      )}
    </ButtonConsumer>
  )
}
