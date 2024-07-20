import React , {useContext} from 'react'
import Form from './Form'
import Header from './Header';
import { UserContext } from '../App'

function Login() {

  const {userId, setUserId} = useContext(UserContext)

  return (
    <div>
        <Header/>
        <Form />
    </div>
  )
}

export default Login