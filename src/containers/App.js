import React, { useState, useReducer, useEffect, useRef } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board'

export default function App () {
  const [keyPress, setKey] = useState('-')
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)

  const useInterval = (callback, delay) => {
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

  const dropActiveTiles = () => {
    boardState.activeTiles.forEach(tile => {
      tile.index && updateBoard({ type: tileActions.DROP_ACTIVE_TILE, index: tile.index })
    })
  }

  const canDrop = () => !boardState.activeTiles.filter(tile => (tile.index + NUMBER_OF_COLUMNS) >= (NUMBER_OF_ROWS * NUMBER_OF_COLUMNS)).length

  useInterval(() => {
    canDrop()
      ? dropActiveTiles()
      : updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
  }, 250)

  return (
    <>
      <Board tileValues={boardState.board} />
      <p>Last arrow key pressed was: {keyPress}</p>
      <button onClick={() => updateBoard({ type: tileActions.SET_S_SHAPE, index: 1, glow: true })}>S</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_Z_SHAPE, index: 9, glow: false })}>Z</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_T_SHAPE, index: 1, glow: false })}>T</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_L_SHAPE, index: 1, glow: true })}>L</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_LINE_SHAPE, index: 1, glow: false })}>Line</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_MIRROR_L_SHAPE, index: 1, glow: false })}>Mirror L</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_SQUARE_SHAPE, index: 1, glow: true })}>Square</button>
      <button onClick={() => updateBoard({ type: tileActions.SET_EMPTY_SHAPE, index: 1, glow: true })}>Empty</button>
      <button onClick={() => dropActiveTiles()}>Drop</button>
    </>
  )
}
