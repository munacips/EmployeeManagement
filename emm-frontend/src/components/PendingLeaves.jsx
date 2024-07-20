import axios from 'axios'
import React, { useState } from 'react'

function PendingLeaves({leaves}) {

    const [message, setMessage] = useState("")

    const approveApp = (id) =>{
        try{
            axios.get(`http://localhost:8000/approve_leave/${id}`)
            .then(response => {
                setMessage("Approved")
            })
            .catch(error => {
                setMessage(error.message)
                setMessage(error.message)
            })
        } catch(error) {
            console.error("Something wrong happened")
        }
    }

  return (
    <div>
        <h3>{message}</h3>
        {leaves.map(leave =>
            <li>User Id : {leave.id} <em>From : {leave.leave_date} To : {leave.return_date}</em> <button onClick={approveApp(leave.id)}>Approve</button> </li>
        )}
    </div>
  )
}

export default PendingLeaves