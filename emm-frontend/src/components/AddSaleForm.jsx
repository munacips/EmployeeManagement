import axios from 'axios'
import React, { useState } from 'react'

function AddSaleForm() {
    const [item, setItem] =  useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")
    const [userId, setUserId] = useState("")
    const [message, setMessage] = useState("")

    const addSale =  async (e) => {
        e.preventDefault()
        try{
            axios.post("http://localhost:8000/add_sale/",{
                item : item,
                date : date,
                amount : amount, 
                userId : userId,
            })
            .then(response => {
                setAmount("")
                setDate("")
                setItem("")
                setMessage("Added successfully")
            })
            .catch(error => {
                setMessage(error.message)
            })
        } catch(error) {
            console.error(error)
        }
    }
    let csrftoken = readCookie('csrftoken')
  return (
    <form onSubmit={addSale} style={styling}>
        <h2>{message}</h2>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        <input type="number" name="userId" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='UserID'/> <br />
        <input type="text" name="item" id="item" value={item} onChange={(e) => setItem(e.target.value)} placeholder='Item' /> <br />
        <label htmlFor="date">Date : </label>
        <input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' /> <br />
        <input type="number" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' /> <br />
        <button type="submit">Add</button>
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

export default AddSaleForm