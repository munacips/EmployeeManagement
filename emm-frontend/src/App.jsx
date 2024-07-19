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

function App() {

  // const [employees, setEmployees] = useState([]);

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
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/add_duty' element={<AddDuty/>}></Route>
        <Route exact path='/add_sale' element={<AddSale/>} ></Route>
        <Route exact path='/checkout' element={<Checkout/>}></Route>
        <Route exact path='/reports' element={<Reports/>}></Route>
        <Route exact path='/create_report' element={<CreateReport/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;


// {employees.map(employee => 
//   <h1>{employee.username}</h1>
// )}
