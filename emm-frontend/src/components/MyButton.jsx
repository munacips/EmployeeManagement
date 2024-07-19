import React from 'react'
import { Link } from 'react-router-dom'

function MyButton(props) {
  return (
    <button style={styling}>
      <Link to={props.route} style={linkstyle} >{props.value}</Link>
    </button>
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

const linkstyle = {
  textDecoration : 'none',
  color : 'white'
}

export default MyButton