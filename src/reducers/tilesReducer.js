import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board'
import shapeName from '../constants/shapes'
import tileActions from '../actions/tileValues'

export const initalTiles = {
  board: Array(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS).fill(shapeName.EMPTY),
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
      return {
        ...state,
        activeTiles: [],
        inActiveTiles: [...state.inActiveTiles, ...state.activeTiles]
      }
  }
}

export default {
  initalTiles,
  tilesReducer
}
