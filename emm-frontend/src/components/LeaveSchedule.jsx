import React, { useEffect, useState } from 'react'
import Header from './Header'
import Leaves from './Leaves'
import axios from 'axios'
import PendingLeaves from './PendingLeaves'

function LeaveSchedule() {
    const [upLeaves, setUpLeaves] = useState([])
    const [pendingLeaves, setPendingLeaves] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/up_leaves/")
        .then(response => {
            setUpLeaves(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    })

    useEffect(()=>{
        axios.get("http://localhost:8000/pending_leaves/")
        .then(response => {
            setPendingLeaves(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    })


  return (
    <div>
        <Header/>
        <h2>LeaveSchedule</h2>
        <h3>Upcoming leaves</h3>
        <Leaves leaves={upLeaves} ></Leaves>
        <h3>Pending applications</h3>
        <PendingLeaves leaves={pendingLeaves}></PendingLeaves>
    </div>
  )
}

export default LeaveSchedule