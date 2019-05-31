import React from 'react'

export default function Text (props) {
  const { setCount, count } = props
  return (
    <button onClick={() => setCount(count + 1)}>
      Click Me
    </button>
  )
}
