import React from 'react'

function Leaves({leaves}) {
  return (
    <div>
        {leaves.map(leave =>
            <li>User Id : {leave.id} <em>From : {leave.leave_date} To : {leave.return_date}</em></li>
        )}
    </div>
  )
}

export default Leaves