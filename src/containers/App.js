import React, { useState, useReducer, useEffect } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'

export default function App () {
  const [keyPress, setKey] = useState('-')
  const [tileValues, setTile] = useReducer(tilesReducer, initalTiles)

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
      <Board tileValues={tileValues} />
      <p>Last arrow key pressed was: {keyPress}</p>
      <button onClick={() => setTile({ type: tileActions.SET_S_SHAPE, index: 10, glow: true })}>S</button>
      <button onClick={() => setTile({ type: tileActions.SET_Z_SHAPE, index: 10, glow: false })}>Z</button>
      <button onClick={() => setTile({ type: tileActions.SET_T_SHAPE, index: 10, glow: false })}>T</button>
      <button onClick={() => setTile({ type: tileActions.SET_L_SHAPE, index: 10, glow: true })}>L</button>
      <button onClick={() => setTile({ type: tileActions.SET_LINE_SHAPE, index: 10, glow: false })}>Line</button>
      <button onClick={() => setTile({ type: tileActions.SET_MIRROR_L_SHAPE, index: 10, glow: false })}>Mirror L</button>
      <button onClick={() => setTile({ type: tileActions.SET_SQUARE_SHAPE, index: 10, glow: true })}>Square</button>
      <button onClick={() => setTile({ type: tileActions.SET_EMPTY_SHAPE, index: 10, glow: true })}>Empty</button>
    </>
  )
}
