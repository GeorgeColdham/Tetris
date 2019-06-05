import React, { useReducer, useEffect, useState } from 'react'
import Board from '../components/Board'
import { initalTiles, tilesReducer } from '../reducers/tilesReducer'
import { useInterval } from '../functions/globalFunctions'
import { generateShape, moveActiveTilesRight, moveActiveTilesLeft, isGameOver, dropSequence } from '../functions/appFunctions'

export default function App () {
  const [boardState, updateBoard] = useReducer(tilesReducer, initalTiles)
  const [dropInterval, setDropInterval] = useState(1000)

  const stopListeners = () => {
    window.removeEventListener('keydown', keyDownHandler)
  }

  const keyDownHandler = (event) => {
    event.key === 'ArrowRight' && moveActiveTilesRight(boardState, updateBoard)
    event.key === 'ArrowLeft' && moveActiveTilesLeft(boardState, updateBoard)
    event.key === 'ArrowDown' && dropSequence(boardState, updateBoard)
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => stopListeners()
  })

  useInterval(() => {
    stopListeners()
    boardState.activeTiles.length
      ? isGameOver(boardState)
        ? setDropInterval(0)
        : dropSequence(boardState, updateBoard)
      : updateBoard({ type: generateShape(), index: 5, glow: true })
  }, dropInterval)

  return (
    <>
      <Board tileValues={boardState.board} />
    </>
  )
}
