import React from 'react'

function Navbar() {
  return (
    <nav style={styling}>
        <li style={listItem}><a style={link} href="/dashboard">Dashboard</a></li>
        <li style={listItem}>Reports</li>
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