import React from 'react'
import Header from './Header'
import MyButton from './MyButton'

function Dashboard() {
  return (
    <div>
        <Header/>
        <h1>Dashboard</h1>
        <MyButton value="Record Duty" route={'/add_duty'}/>
        <MyButton value="Record Sale" route={'/add_sale'}/>
        <MyButton value="Checkout" route={'/logout'}/>
    </div>
  )
}

export default Dashboard