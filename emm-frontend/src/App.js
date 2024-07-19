import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:800/employees/')
    .then(response => {
      setEmployees(response.data);
    })
    .catch(error => {
      console.log(error)
    })
  })

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;


// {employees.map(employee => 
//   <h1>{employee.username}</h1>
// )}
