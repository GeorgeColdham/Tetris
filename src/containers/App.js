import React, { useReducer, useEffect } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { useInterval } from '../functions/globalFunctions'
import { canDrop, dropActiveTiles, generateShape, moveActiveTilesRight, moveActiveTilesLeft } from '../functions/appFunctions'

export default function App () {
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)

  const stopListener = () => {
    window.removeEventListener('keydown', handler)
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => stopListener()
  })

  const handler = (event) => {
    event.key === 'ArrowRight' && moveActiveTilesRight(boardState, updateBoard)
    event.key === 'ArrowLeft' && moveActiveTilesLeft(boardState, updateBoard)
  }

  useInterval(() => {
    stopListener()
    boardState.activeTiles.length
      ? canDrop(boardState)
        ? dropActiveTiles(boardState, updateBoard)
        : updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
      : updateBoard({ type: generateShape(), index: 5, glow: true })
  }, 1000)

  return (
    <>
      <Board tileValues={boardState.board} />
    </>
  )
}
