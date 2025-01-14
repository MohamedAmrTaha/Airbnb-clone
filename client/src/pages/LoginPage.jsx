import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useContext } from "react";
import UserContext from "../UserContext";
const LoginPage = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const login = async (e)=>{
        e.preventDefault()
        await axios.post('/login',{email,password})
        .then(res=>{
            alert('Logged in successfully')
            // setUser(res.data)
            navigate('/')

        })
        .catch(err=>{
            alert('Login failed, please try again later')
        })
    }
    return ( 
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={login}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="primary">Login</button>
                <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link></div>
            </form>
        </div>
    </div> 
    );
}
 
export default LoginPage