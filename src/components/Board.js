import React from 'react'
import GridTile from './GridTile'

export default function Board (props) {
  return (
    <div ref='board' className='board'>
      {Array(200).fill('').map((tile, i) => <GridTile key={`gridTile${i}`} />)}
    </div>
  )
}
