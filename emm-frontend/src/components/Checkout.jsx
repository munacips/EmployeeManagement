import axios from 'axios'
import React, { useState } from 'react'

function Checkout() {

    const [message, setMessage] = useState("Proceed to checkout")
    const [id, setId] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/checkout/",{
                id:id
            })
            .then(response => {
                setId("")
                setMessage("Checked out")
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error){
            console.error(error.message)
        }
    }

    let csrftoken = readCookie('csrftoken')
  return (
    <div>
        <h2>{message}</h2>
        <form onSubmit={handleSubmit} >
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
            <label htmlFor="userId">Enter ID</label>
            <input type="number" name="userId" id="userId" value={id} onChange={(e) => setId(e.target.value)} /><br />
            <button style={styling} type="submit">Checkout</button>
        </form>
    </div>
  )
}

const styling = {
    fontSize : '1em',
    width : '45%',
    textAlign : 'center',
    backgroundColor : 'black',
    color : 'white',
    border : '1px solid black',
    borderRadius : '0.5em',
    padding : '3px',
    display : 'block',
    margin : '1em',
    justifyItems : 'center',
    maxWidth: '45%',
    marginLeft: 'auto',
    marginRight: 'auto'
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

export default Checkout