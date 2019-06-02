import React from 'react'
import Board from '../components/Board'

export default function App () {
  // const state = {
  //   board: [
  //     {
  //       row: 0,
  //       column: 0,
  //       active: true,
  //       type: T_SHAPE,
  //       isOrigin: true,
  //       shape_id: 12345
  //     }
  //   ]
  // }

  return (
    <>
      <Board />
      <button onClick={() => console.log('clicked')}>Add Tile</button>
    </>
  )
}
