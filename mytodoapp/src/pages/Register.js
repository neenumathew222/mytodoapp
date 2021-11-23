import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Layout from "../components/layout/Layout";
import { withRedux } from '../lib/redux';
import AuthForm from '../components/authForm/AuthForm';
import {setLoggedUserInfo } from "../components/redux/actions/todolist.action"
import SnackBar from "../components/snackbar/SnackBar";

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const dispatch = useDispatch();
    const history = useNavigate();

    const authDetails = useSelector((state) => {
        return state.todoList.userInfo;
    });

    const registerUser  = (data) => {
        setOpen(true)
        if(!data.username || !data.password){
            setMsg('Please provide username and password');
            setSeverity('info')
        }
        else if(authDetails.username === data.username){
            setMsg('User already have an account');
            setSeverity('info')
        }else{
            setMsg('User Registered Successfully');
            setSeverity('success');
            dispatch(setLoggedUserInfo({ data: data }));
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <Layout>
       <SnackBar opensnackbar={open} message={msg} severity={severity} onModalClose={handleClose}/>
        <AuthForm title="REGISTER" text="Already have an account? Login" onSubmit={(data)=>registerUser(data)} clickOnLink={()=>history(`/login`)} proceedBtnText="Register"/> 
      </Layout>
    )
}

export default withRedux(Register)