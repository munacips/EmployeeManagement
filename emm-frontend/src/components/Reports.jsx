import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MyButton from './MyButton'

function Reports() {

    const [reports, setReports] = useState([])
    const [message, setMessage] = useState("")

    useEffect(()=>{
        try{
            axios.get("http://localhost:8000/reports/")
            .then(response => {
                setReports(response.data)
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    })

  return (
    <div>
        <Header/>
        <h2>{message}</h2>
        <MyButton route={'/create_report'} value={'Create new report'}></MyButton>
        {reports.map(report => 
            <div>
                <Link to={`http://localhost:8000/${report['file']}`}>Report : {report['id']}</Link>
            </div>
        )}
    </div>
  )
}

export default Reports