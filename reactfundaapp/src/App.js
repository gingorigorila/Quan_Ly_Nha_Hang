import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Restaurant from './pages/Restaurant';
import Addrestaurant from './pages/Addrestaurant';
import Editrestaurant from './pages/Editrestaurant';
import Viewrestaurant from './pages/Viewrestaurant';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
     const token = localStorage.getItem('auth_token');
     config.headers.Authorization = token ? `Bearer ${token}` : '';
     return config;
});


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Restaurant/>}/>
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} /> */}
          
          <Route path="/login" element= {localStorage.getItem('auth_token') ? <Navigate to='/'/> :<Login />}/>
              
          
          <Route path="/register" element= {localStorage.getItem('auth_token') ? <Navigate to='/' /> :<Register />}/>
          
          <Route path="/add-restaurant" element={<Addrestaurant/>} />
          <Route path="/edit-restaurant/:id" element={<Editrestaurant/>} />
          <Route path="/view-restaurant/:id" element={<Viewrestaurant/>} />
        </Routes>
    </Router>
  );
}

export default App;
