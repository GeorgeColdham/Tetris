import React, { useState, useEffect } from 'react'
import Board from '../components/Board'

// import IMG from '../untitled.png'

export default function App () {
  // const state = {
  //   board: [
  //     {
  //       row: 0,
  //       column: 0,
  //       active: true,
  //       type: T_SHAPE,
  //       isOrigin: true,
  //       shape_id: 12345
  //     }
  //   ]
  // }

  const [keyPress, setKey] = useState('-')

  useEffect(() => {
    window.addEventListener('keydown', handleInput)
  })

  const handleInput = e => {
    switch (e.key) {
      case 'ArrowUp':
        setKey(e.key)
        break
      case 'ArrowDown':
        setKey(e.key)
        break
      case 'ArrowLeft':
        setKey(e.key)
        break
      case 'ArrowRight':
        setKey(e.key)
        break
      default:
        setKey('-')
    }
  }

  return (
    <>
      <Board />
      <p>Last arrow key pressed was: {keyPress}</p>
    </>
  )
}
