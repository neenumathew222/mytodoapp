import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Mylist from "../pages/MyList";
import Create from "../pages/Create";
import Update from "../pages/Update";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";

const AppRoute = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to ="/login" />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/mylist" element={<Mylist />}/>
          <Route path="/create" element={<Create />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
    </Router>
    );
  };
  
  export default AppRoute;