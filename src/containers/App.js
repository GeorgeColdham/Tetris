import React, { useState, useReducer, useEffect } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { useInterval, returnKeyPress } from '../functions/globalFunctions'
import { canDrop, dropActiveTiles, generateShape } from '../functions/appFunctions'

export default function App () {
  const [keyPress, setKey] = useState('-')
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPressEvent)
  })

  const handleKeyPressEvent = e => returnKeyPress(e, setKey)

  useInterval(() => {
    boardState.activeTiles.length
      ? canDrop(boardState)
        ? dropActiveTiles(boardState, updateBoard)
        : updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
      : updateBoard({ type: generateShape(), index: 5, glow: true })
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
      <button onClick={() => updateBoard({ type: tileActions.SET_EMPTY_SHAPE, index: 191, glow: true })}>Empty</button>
      <button onClick={() => dropActiveTiles(boardState, updateBoard)}>Drop</button>
    </>
  )
}
