import './App.css'
import IndexPage from './pages/IndexPage'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RigesterPage'
import axios from 'axios'
import {useEffect, useState} from 'react'
import UserContext from './UserContext'
import { use } from 'react'
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  const[user, setUser] = useState(null)
  useEffect(()=>{
    axios.get('/profile')
    .then(res=>{
      setUser(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        
      </Routes>
    </UserContext.Provider>
    
  )
}

export default App
