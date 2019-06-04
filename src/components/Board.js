import React from 'react'
import GridTile from './GridTile'
import { NUMBER_OF_COLUMNS } from '../constants/board'

export default function Board (props) {
  return (
    <div className='board'>
      {Array(200).fill('').map((tile, i) => {
        const column = i % NUMBER_OF_COLUMNS
        const row = Math.floor(i / NUMBER_OF_COLUMNS)
        const key = `${column},${row}`
        return <GridTile key={key} tileValue={props.tileValues[i]} />
      })}
    </div>
  )
}
