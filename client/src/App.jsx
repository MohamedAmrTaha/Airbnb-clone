import './App.css'
import IndexPage from './pages/IndexPage'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RigesterPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
      
    </Routes>
    
  )
}

export default App
