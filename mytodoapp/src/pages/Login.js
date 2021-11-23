import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from "../components/layout/Layout";
import { withRedux } from '../lib/redux';
import AuthForm from '../components/authForm/AuthForm';
import {setLoggedInStatus } from "../components/redux/actions/todolist.action";
import SnackBar from "../components/snackbar/SnackBar";

const LoginPage = () => {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();
    const history = useNavigate();
    const authDetails = useSelector((state) => {
        return state.todoList;
    });

    const loginUser = (data) => {
        if(!data.username || !data.password){
            setMsg("Username and Password Required");setOpen(true)
        }
        else if( data.username === authDetails.userInfo.username && data.password === authDetails.userInfo.password) {
            dispatch(setLoggedInStatus({ data: true }));
            history(`/mylist`);
        }else if (data.username !== authDetails.userInfo.username){
            setMsg("Incorrect Username");setOpen(true)
        }else if(data.password !== authDetails.userInfo.password){
            setMsg("Incorrect Password");setOpen(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };


    return(
        <Layout>
            <SnackBar opensnackbar={open} message={msg} severity='error' onModalClose={handleClose}/>
          <AuthForm title="LOGIN" text="Don't have an account? Sign Up" onSubmit={(data)=>loginUser(data)} clickOnLink={()=> history(`/register`)} proceedBtnText="Login"/> 
        </Layout>
    )
}

export default withRedux(LoginPage)