import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Paint from './components/pages/Paint'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Paint />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
