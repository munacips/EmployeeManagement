import './App.css';
import React ,{useState} from 'react';
//import axios from 'axios';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AddDuty from './components/AddDuty';
import AddSale from './components/AddSale';
import Checkout from './components/Checkout';
import Reports from './components/Reports';
import CreateReport from './components/CreateReport';
import LeaveApplication from './components/LeaveApplication';
import MyDetails from './components/MyDetails';
import Form from './components/Form';
import LeaveSchedule from './components/LeaveSchedule';

export const UserContext = React.createContext(null)

function App() {

  // const [employees, setEmployees] = useState([]);
  const [userId, setUserId] = useState("")

  // useEffect(() => {
  //   axios.get('http://localhost:800/employees/')
  //   .then(response => {
  //     setEmployees(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // })

  return (
    <Router>
      <Navbar/>
      <UserContext.Provider value={{userId : userId, setUserId : setUserId}}>
        <Routes>
            <Route exact path='/' element={<Login />}></Route>
            <Route exact path='/dashboard' element={<Dashboard/>}></Route>
            <Route exact path='/add_duty' element={<AddDuty/>}></Route>
            <Route exact path='/add_sale' element={<AddSale/>} ></Route>
            <Route exact path='/checkout' element={<Checkout/>}></Route>
            <Route exact path='/reports' element={<Reports/>}></Route>
            <Route exact path='/login_form' element={<Form/>}/>
            <Route exact path='/create_report' element={<CreateReport/>}></Route>
            <Route exact path='/apply_leave' element={<LeaveApplication/>}></Route>
            <Route exact path='/my_details' element={<MyDetails/>}></Route>
            <Route exac path='/leave_schedule' element={<LeaveSchedule/>} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;


// {employees.map(employee => 
//   <h1>{employee.username}</h1>
// )}
