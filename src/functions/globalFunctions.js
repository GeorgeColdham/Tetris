import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const returnKeyPress = (e, callbackFunc) => {
  switch (e.key) {
    case 'ArrowUp':
      callbackFunc(e.key)
      break
    case 'ArrowDown':
      callbackFunc(e.key)
      break
    case 'ArrowLeft':
      callbackFunc(e.key)
      break
    case 'ArrowRight':
      callbackFunc(e.key)
      break
    default:
      callbackFunc('-')
      break
  }
}
