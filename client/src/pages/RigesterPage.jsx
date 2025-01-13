import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
const RegisterPage = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const register = async (e)=>{
        e.preventDefault()
        try{
            await axios.post('/register',{username,email,password})
            alert('Registered successfully, now you can login')
        }
        catch(err){
            alert('Registration failed, please try again later')
        }

        
        
        
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={register} >
                <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="primary">Register</button>
                <div className='text-center py-2 text-gray-500'>Already a member? <Link to={'/login'} className="underline text-black">Login</Link></div>
            </form>
        </div>
    </div> 
    )
}
export default RegisterPage