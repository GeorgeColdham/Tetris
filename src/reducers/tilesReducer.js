import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board'
import shapeName from '../constants/shapes'
import tileActions from '../actions/tileValues'

export const initalTiles = Array(NUMBER_OF_ROWS * NUMBER_OF_COLUMNS).fill(shapeName.EMPTY)
export const tilesReducer = (state, action) => {
  switch (action.type) {
    case tileActions.SET_S_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.S} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_Z_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.Z} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_T_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.T} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_L_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.L} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_LINE_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.LINE} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_MIRROR_L_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.MIRROR_L} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_SQUARE_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.SQUARE} ${action.glow && 'glow'}` : tile)
    case tileActions.SET_EMPTY_SHAPE:
      return state.map((tile, index) => index === action.index ? `${shapeName.EMPTY} ${action.glow && 'glow'}` : tile)
  }
}

export default {
  initalTiles,
  tilesReducer
}
