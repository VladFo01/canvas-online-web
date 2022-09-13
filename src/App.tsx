import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>{import.meta.env.VITE_NODE_VAR}</div>
      <p>Hello</p>
    </>
  )
}

export default App
