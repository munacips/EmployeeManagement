import axios from 'axios'
import React, {useContext, useState} from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

function Form() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("Login")
    const {userId, setUserId} = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/dashboard")
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/checkin",
                {
                username: username,
                password: password
              })
            .then(response =>{
                setUsername("");
                setPassword("");
                setUserId(response.data)
                setMessage("User logged in successfully");
                handleClick()
            })
            .catch(error => {
                setMessage(error.message);
            })
        } catch(error){
            console.error(error)
        }
    }
    let csrftoken = readCookie('csrftoken')
  return (
    <form onSubmit={handleSubmit} style={styling}>
        <h3>{message}</h3>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
        <input type="text" name="username" id="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
        <input type="text" name="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
        <button type="submit">Login</button>
    </form>
  )
}

function readCookie(name){
    var nameEQ = name + "="
    var ca = document.cookie.split(';')
    for(let i=0;i<ca.length;i++){
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length)
    }
    return null
}

const styling = {
    fontSize: 30,
    textAlign: 'center'
}

export default Form