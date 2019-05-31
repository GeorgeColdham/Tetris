import React, { useState, useEffect } from 'react'
import Text from '../components/Text'
import Button from '../components/Button'

export default function App () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <>
      <Text count={count} />
      <Button setCount={setCount} count={count} />
    </>
  )
}
