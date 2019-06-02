import React, { useReducer, useEffect, createContext } from 'react'
import Text from '../components/Text'
import Buttons from '../components/Buttons'

export const ButtonContext = createContext()
export const ButtonProvider = ButtonContext.Provider
export const ButtonConsumer = ButtonContext.Consumer

const initialState = { count: 0 }
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const buttonContextValues = {
    ...state,
    dispatch
  }

  useEffect(() => {
    document.title = `You clicked ${state.count} times`
  })

  return (
    <ButtonProvider value={buttonContextValues}>
      <Text />
      <Buttons />
    </ButtonProvider>
  )
}
