import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios'

function LeaveApplication() {

    const [message, setMessage] = useState("Apply for a leave")
    const [userId, setUserId] = useState("")
    const [days, setDays] = useState("")
    const [leave_date, setLeaveDate] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/apply_leave/",{
                userId : userId,
                days : days,
                leave_date : leave_date
            })
            .then(response => {
                setMessage(response.data)
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error) {
            console.log(error.message)
        }
    } 
    let csrftoken = readCookie('csrftoken')
  return (
    <div>
        <Header/>
        <h2>Leave applications </h2>
        <form onSubmit={handleSubmit} style={styling}>
            <h2>{message}</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <input type="number" name="userId" id="userId" placeholder='User ID' value={userId} onChange={(e) => {setUserId(e.target.value)}} /> <br />
            <input type="number" name="days" id="days" placeholder='Number of days' value={days} onChange={(e) => {setDays(e.target.value)}} /> <br />
            <label htmlFor="leave_date">Leave date</label> <br />
            <input type="date" name="leave_date" id="leave_date" placeholder='Leave date' value={leave_date} onChange={(e)=>{setLeaveDate(e.target.value)}} /> <br />
            <button type="submit">Apply</button>
        </form>
    </div>
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

export default LeaveApplication