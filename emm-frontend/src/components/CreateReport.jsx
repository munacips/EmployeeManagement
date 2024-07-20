import React, {useState} from 'react'
import Header from './Header'
import axios from 'axios'

function CreateReport() {

    const [userId, setUserId] = useState("")
    const [date_from, setDateFrom] = useState("")
    const [date_to, setDateTo] = useState("")
    const [message, setMessage] = useState("Create a report")

    let csrftoken = readCookie('csrftoken')

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/create_report/",{
                userId : userId,
                date_to : date_to,
                date_from : date_from
            })
            .then(response => {
                setMessage("Created")
                setDateFrom("")
                setDateTo("")
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

  return (
    <div>
        <Header/>
        <h2>{message}</h2>
        <form onSubmit={handleSubmit} style={styling}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
            <input type="number" name="userId" id="userId" value={userId} onChange={(e)=>{setUserId(e.target.value)}} placeholder='User Id'/> <br />
          
            <input type="date" name="date_from" id="date_to" value={date_from} onChange={(e)=>{setDateFrom(e.target.value)}} placeholder='Date From' /> <br />
           
            <input type="date" name="date_to" id="date_to" value={date_to} onChange={(e)=>{setDateTo(e.target.value)}} placeholder='Date to'/> <br />
            <button type="submit">Create</button>
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

export default CreateReport