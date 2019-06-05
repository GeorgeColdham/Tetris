import React, { useReducer, useEffect } from 'react'
import Board from '../components/Board'
import tileActions from '../actions/tileValues'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { useInterval } from '../functions/globalFunctions'
import { canDrop, dropActiveTiles, generateShape, moveActiveTilesRight, moveActiveTilesLeft } from '../functions/appFunctions'

export default function App () {
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)
  useEffect(() => {
    const handler = (event) => {
      event.key === 'ArrowRight' && moveActiveTilesRight(boardState, updateBoard)
      event.key === 'ArrowLeft' && moveActiveTilesLeft(boardState, updateBoard)
    }

    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  })

  useInterval(() => {
    boardState.activeTiles.length
      ? canDrop(boardState)
        ? dropActiveTiles(boardState, updateBoard)
        : updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
      : updateBoard({ type: generateShape(), index: 5, glow: true })
  }, 500)

  return (
    <>
      <Board tileValues={boardState.board} />
    </>
  )
}
