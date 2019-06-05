import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board'
import tileActions from '../actions/tileValues'

export const canDrop = boardState => {
  const isOnFloor = onFloor(boardState)
  const isOnTile = onTile(boardState)
  return !isOnFloor && !isOnTile
}

export const dropActiveTiles = (boardState, updateBoard) => {
  boardState.activeTiles.forEach(tile => {
    tile.index && updateBoard({ type: tileActions.DROP_ACTIVE_TILE, index: tile.index })
  })
}

export const onFloor = boardState => {
  return !!boardState.activeTiles.filter(tile => {
    const nextTileIndex = tile.index + NUMBER_OF_COLUMNS
    const boardSize = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS

    return nextTileIndex >= boardSize
  }).length
}

export const onTile = boardState => {
  console.log(boardState.inActiveTiles)
  return !!boardState.activeTiles.filter(tile => {
    const nextTileIndex = tile.index + NUMBER_OF_COLUMNS

    return boardState.inActiveTiles.filter(tile =>
      tile.index === nextTileIndex
    ).length
  }).length
}
