import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board'
import shapeName from '../constants/shapes'
import tileActions from '../actions/tileValues'

const defaultEmptyBoard = Array(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS).fill(shapeName.EMPTY)

export const initalTiles = {
  board: defaultEmptyBoard,
  activeTiles: [],
  inActiveTiles: []
}

const setClassName = (shape, glow) => {
  return shape ? `${shape} ${glow && 'glow'}` : ''
}

const setActiveTile = (index, shape, glow) => [{ shape, glow, index }]

const removeInactiveTies = (inactiveTiles, tileToRemove) => {
  return inactiveTiles.filter(tile => tile.index !== tileToRemove)
}

const setBoard = (shape, board, action) => {
  return board.map((tile, index) => index === action.index ? setClassName(shape, action.glow) : tile)
}

const setShape = (state, action, shape) => {
  return {
    board: setBoard(shape, state.board, action),
    activeTiles: [...state.activeTiles, ...setActiveTile(action.index, shape, action.glow)],
    inActiveTiles: state.inActiveTiles
  }
}

const setEmpty = (state, action, shape) => {
  return {
    board: setBoard(shape, state.board, action),
    activeTiles: state.activeTiles,
    inActiveTiles: removeInactiveTies(state.inActiveTiles, action.index)
  }
}

const dropActiveTile = (state, action) => {
  const activeTile = state.activeTiles.filter(tile => tile.index === action.index)[0]
  if (activeTile) {
    const newActiveTile = { ...activeTile, index: activeTile.index + NUMBER_OF_COLUMNS }
    const duelTileBoard = setBoard(activeTile.shape, state.board, newActiveTile)
    const finalBoard = setBoard(shapeName.EMPTY, duelTileBoard, activeTile)
    const newActiveTiles = state.activeTiles.map(tile => tile.index === action.index
      ? { ...tile, index: tile.index + NUMBER_OF_COLUMNS }
      : tile
    )
    return {
      board: finalBoard,
      activeTiles: newActiveTiles,
      inActiveTiles: state.inActiveTiles
    }
  } return state
}

const dropAllTiles = (state, action) => {
  const rowBounds = action.rowsRemoved.map(row => row[0])
  const newInActiveTiles = state.inActiveTiles
    .map(tile => {
      const numOfRowsToDrop = rowBounds.reduce((acc, currVal) => {
        return tile.index < currVal ? acc + 1 : acc
      }, 0)
      return { ...tile, index: tile.index + (numOfRowsToDrop * NUMBER_OF_COLUMNS) }
    })

  const newBoard = defaultEmptyBoard.map((tile, index) => {
    const matchingTile = newInActiveTiles.filter(inactiveTile => {
      return inactiveTile.index === index
    })
    return matchingTile.length ? setClassName(matchingTile[0].shape, matchingTile[0].glow) : ''
  })
  return {
    board: newBoard,
    activeTiles: state.activeTiles,
    inActiveTiles: newInActiveTiles
  }
}

const moveActiveTileRight = (state, action) => {
  const activeTile = state.activeTiles.filter(tile => tile.index === action.index)[0]
  if (activeTile && !hitsRightEdge(activeTile.index + 1) && !hitsTileEdge(activeTile.index + 1, state.inActiveTiles)) {
    const newActiveTile = { ...activeTile, index: activeTile.index + 1 }
    const duelTileBoard = setBoard(activeTile.shape, state.board, newActiveTile)
    const finalBoard = setBoard(shapeName.EMPTY, duelTileBoard, activeTile)
    const newActiveTiles = state.activeTiles.map(tile => tile.index === action.index
      ? { ...tile, index: tile.index + 1 }
      : tile
    )
    return {
      board: finalBoard,
      activeTiles: newActiveTiles,
      inActiveTiles: state.inActiveTiles
    }
  } return state
}

const moveActiveTileLeft = (state, action) => {
  const activeTile = state.activeTiles.filter(tile => tile.index === action.index)[0]
  if (activeTile && !hitsLeftEdge(activeTile.index) && !hitsTileEdge(activeTile.index - 1, state.inActiveTiles)) {
    const newActiveTile = { ...activeTile, index: activeTile.index - 1 }
    const duelTileBoard = setBoard(activeTile.shape, state.board, newActiveTile)
    const finalBoard = setBoard(shapeName.EMPTY, duelTileBoard, activeTile)
    const newActiveTiles = state.activeTiles.map(tile => tile.index === action.index
      ? { ...tile, index: tile.index - 1 }
      : tile
    )
    return {
      board: finalBoard,
      activeTiles: newActiveTiles,
      inActiveTiles: state.inActiveTiles
    }
  } else return state
}

const resetActiveTiles = (state) => {
  return {
    ...state,
    activeTiles: [],
    inActiveTiles: [...state.inActiveTiles, ...state.activeTiles]
  }
}

const hitsRightEdge = nextIndex => {
  return !(nextIndex % NUMBER_OF_COLUMNS)
}

const hitsLeftEdge = currentIndex => {
  return !(currentIndex % NUMBER_OF_COLUMNS)
}

const hitsTileEdge = (nextIndex, inactiveTiles) => {
  return inactiveTiles.filter(tile => tile.index === nextIndex).length
}

export const tilesReducer = (state, action) => {
  switch (action.type) {
    case tileActions.SET_S_SHAPE:
      return setShape(state, action, shapeName.S)
    case tileActions.SET_Z_SHAPE:
      return setShape(state, action, shapeName.Z)
    case tileActions.SET_T_SHAPE:
      return setShape(state, action, shapeName.T)
    case tileActions.SET_L_SHAPE:
      return setShape(state, action, shapeName.L)
    case tileActions.SET_LINE_SHAPE:
      return setShape(state, action, shapeName.LINE)
    case tileActions.SET_MIRROR_L_SHAPE:
      return setShape(state, action, shapeName.MIRROR_L)
    case tileActions.SET_SQUARE_SHAPE:
      return setShape(state, action, shapeName.SQUARE)
    case tileActions.SET_EMPTY_SHAPE:
      return setEmpty(state, action, shapeName.EMPTY)
    case tileActions.DROP_ACTIVE_TILE:
      return dropActiveTile(state, action)
    case tileActions.RESET_ACTIVE_TILES:
      return resetActiveTiles(state)
    case tileActions.MOVE_ACTIVE_RIGHT:
      return moveActiveTileRight(state, action)
    case tileActions.MOVE_ACTIVE_LEFT:
      return moveActiveTileLeft(state, action)
    case tileActions.DROP_BOARD:
      return dropAllTiles(state, action)
  }
}

export default {
  initalTiles,
  tilesReducer
}
