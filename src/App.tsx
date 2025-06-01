import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CharactersListPage } from './pages/characters_list/CharactersListPage'

function App() {
  return (
    <Routes>
      <Route path='/' Component={CharactersListPage}/>
    </Routes>
  )
}

export default App
