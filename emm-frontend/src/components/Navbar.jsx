import React from 'react'

function Navbar({userId}) {
  return (
    <nav style={styling}>
        <li style={listItem}><a style={link} href="/dashboard">Dashboard</a></li>
        <li style={listItem}><a style={link} href="/reports">Reports</a></li>
        <li style={listItem}><a style={link} href="/leave_schedule">Leave shcedules</a></li>
        {()=>{
          if (userId!==0) {
            return <li>{userId}</li>
          }
        }}
    </nav>
  )
}

const styling = {
    display : 'flex',
    flexDirection : 'row',
    width : '100%',
    backgroundColor : 'black'
}
const listItem = {
    listStyleType : 'none',
    display : 'block',
    padding : '0.3em',
    color : 'white',
    fontSize : '1.5em',
    cursor : 'pointer'
}
const link = {
    color : 'white',
    textDecoration : 'none'
}


export default Navbar