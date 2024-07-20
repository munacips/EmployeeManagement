import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { UserContext } from '../App'

function MyDetails() {
    const [employee, setEmployee] = useState("")
    const [message, setMessage] = useState("My Details")
    const {userId, setUserId} = useContext(UserContext)

    useEffect(()=>{
        try{
            axios.get(`http://localhost:8000/employees/${userId}`)
            .then(response => {
                setEmployee(response.data)
            })
            .catch(error =>{
                console.log(error.mesage)
                setMessage(message)
            })
        } catch(error){
            console.log(error)
        }
    })
  return (
    <div>
        <Header></Header>
        <h2>{message}</h2>
        <div>
            user ID : {userId} <br />
            Name : {employee['username']} {employee['lastname']} <br />
        </div>
    </div>
  )
}

export default MyDetails