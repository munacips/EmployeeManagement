import React, { useState } from 'react'


const Footer = () => {

    const [items, setItems] =  useState([{id:3,text:'Hie'},{id:4,text:'Hello'}])

  return (
    <div>
        {items.map((item)=>(
            <h1>{item.text}</h1>
        ))}
    </div>
  )
}

export default Footer