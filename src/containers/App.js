import React, { useReducer, useEffect, useState } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { useInterval } from '../functions/globalFunctions'
import { canDrop, dropActiveTiles, generateShape, moveActiveTilesRight, moveActiveTilesLeft, isGameOver } from '../functions/appFunctions'

export default function App () {
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)
  const [dropInterval, setDropInterval] = useState(50)

  const stopListener = () => {
    window.removeEventListener('keydown', handler)
  }

  const handler = (event) => {
    event.key === 'ArrowRight' && moveActiveTilesRight(boardState, updateBoard)
    event.key === 'ArrowLeft' && moveActiveTilesLeft(boardState, updateBoard)
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => stopListener()
  })

  useInterval(() => {
    stopListener()
    boardState.activeTiles.length
      ? isGameOver(boardState)
        ? setDropInterval(0)
        : canDrop(boardState)
          ? dropActiveTiles(boardState, updateBoard)
          : updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
      : updateBoard({ type: generateShape(), index: 5, glow: true })
  }, dropInterval)

  return (
    <>
      <Board tileValues={boardState.board} />
    </>
  )
}
