import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, NUMBER_OF_SHAPES } from '../constants/board'
import tileActions from '../actions/tileValues'

export const canDrop = boardState => {
  const isOnFloor = onFloor(boardState)
  const isOnTile = onTile(boardState)
  return !isOnFloor && !isOnTile
}

export const dropActiveTiles = (boardState, updateBoard) => {
  return boardState.activeTiles.forEach(tile => {
    return !isNaN(tile.index) && updateBoard({ type: tileActions.DROP_ACTIVE_TILE, index: tile.index })
  })
}

export const moveActiveTilesRight = (boardState, updateBoard) => {
  return boardState.activeTiles.forEach(tile => {
    return !isNaN(tile.index) && updateBoard({ type: tileActions.MOVE_ACTIVE_RIGHT, index: tile.index })
  })
}

export const moveActiveTilesLeft = (boardState, updateBoard) => {
  return boardState.activeTiles.forEach(tile => {
    return !isNaN(tile.index) && updateBoard({ type: tileActions.MOVE_ACTIVE_LEFT, index: tile.index })
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
  return !!boardState.activeTiles.filter(tile => {
    const nextTileIndex = tile.index + NUMBER_OF_COLUMNS

    return boardState.inActiveTiles.filter(tile =>
      tile.index === nextTileIndex
    ).length
  }).length
}

export const isGameOver = (state) => {
  const gameState = state.inActiveTiles.filter(inactiveTile => {
    return state.activeTiles.filter(activeTiles => {
      return activeTiles.index === inactiveTile.index
    }).length
  }).length
  return gameState
}

export const generateShape = () => {
  const shape = Math.floor(Math.random() * NUMBER_OF_SHAPES)
  switch (shape) {
    case 0:
      return tileActions.SET_S_SHAPE
    case 1:
      return tileActions.SET_Z_SHAPE
    case 2:
      return tileActions.SET_T_SHAPE
    case 3:
      return tileActions.SET_L_SHAPE
    case 4:
      return tileActions.SET_LINE_SHAPE
    case 5:
      return tileActions.SET_MIRROR_L_SHAPE
    case 6:
      return tileActions.SET_SQUARE_SHAPE
  }
}

export const dropSequence = (boardState, updateBoard) => {
  if (canDrop(boardState)) {
    dropActiveTiles(boardState, updateBoard)
  } else {
    updateBoard({ type: tileActions.RESET_ACTIVE_TILES })
  }
}

export const dropBoard = (updateBoard, rowsRemoved) => {
  rowsRemoved.length && updateBoard({ type: tileActions.DROP_BOARD, rowsRemoved })
}

export const removeRows = (updateBoard, inactiveTiles) =>
  Array(NUMBER_OF_ROWS).fill('').map((row, index) => index * NUMBER_OF_COLUMNS)
    .filter(row =>
      inactiveTiles.filter(tile =>
        tile.index === row).length)
    .map(row =>
      Array(NUMBER_OF_COLUMNS).fill('').map((col, cIndex) =>
        cIndex + row))
    .map(rowIndex => rowIndex.filter(row =>
      inactiveTiles.filter(tile =>
        tile.index === row).length))
    .filter(row =>
      row.length === NUMBER_OF_COLUMNS)
    .map(row => {
      row.map(tile => updateBoard({ type: tileActions.SET_EMPTY_SHAPE, index: tile }))
      return row
    })

export const newShapeSequence = (updateBoard, inactiveTiles) => {
  updateBoard({ type: generateShape(), index: 5, glow: false })
}
