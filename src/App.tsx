import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Paint from './components/pages/Paint'
import { v4 as uuidv4 } from 'uuid'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<Paint />} />
        <Route path='*' element={<Navigate to={`${uuidv4()}`} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
