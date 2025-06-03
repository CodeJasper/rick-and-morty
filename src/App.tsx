import { Route, Routes } from 'react-router-dom'
// import './App.css'
import { CharactersListPage } from './pages/characters_list/CharactersListPage'
import { CharacterDetailsPage } from './pages/character_details/CharactersDetailsPage'

function App() {
  return (
    <div className="container mx-auto min-h-screen bg-gray-100">
      <div className="p-6">
        <Routes>
          <Route path='/' Component={CharactersListPage}/>
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
