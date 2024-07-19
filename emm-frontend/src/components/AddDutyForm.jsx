import axios from 'axios'
import React, { useState } from 'react'

function AddDutyForm() {
    const [userId, setUserId] = useState("")
    const [role, setRole] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("Add Duty")
    //const [userInfo, setUserInfo] = useState("")


    const submitDuty = async(e) =>{
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/add_duty/",
                {
                    role : role,
                    description : description,
                    userId : userId
                }
            )
            .then(response =>{
                setDescription("")
                setRole("")
                setMessage("Added successfully")
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error){
            console.error(error)
        }
    }
    let csrftoken = readCookie('csrftoken')
  return (
    <form onSubmit={submitDuty} style={styling}>
        <h2>{message}</h2>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        <input type="number" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID"/> <br />
        <input type="text" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" /><br />
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="disc" placeholder="Description..."/><br />
        <button type="submit">Add</button><br />
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
    textAlign : 'center'
}

export default AddDutyForm