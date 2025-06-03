import { Route, Routes } from 'react-router-dom'
// import './App.css'
import { CharactersListPage } from './pages/characters_list/CharactersListPage'

function App() {
  return (
    <div className="container mx-auto min-h-screen bg-gray-100 p-6">
      <Routes>
        <Route path='/' Component={CharactersListPage}/>
      </Routes>
    </div>
  )
}

export default App
