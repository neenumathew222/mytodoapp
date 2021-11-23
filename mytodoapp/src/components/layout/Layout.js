import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { withRedux } from "../../lib/redux";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedUserInfo, setLoggedInStatus } from '../redux/actions/todolist.action';

const useStyles = makeStyles(() => ({
    mainContainer:{
        width: "100vw", height: "100vh", backgroundColor: "white"
    },
    appTitle:{
        padding: "10px"
    },
    headerContainer:{
        height: "50px", backgroundColor: "cornflowerblue"
    },
    headerItem:{
        padding:"10px", cursor:"pointer"
    },
    itemAlign:{
        display:"flex"
    }
}));

const Layout = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => {
        return state.todoList;
    });
    const classes = useStyles();
    const { children } = props;

    const url = window.location.pathname.split('/');
    
    const logout = () => {
        dispatch(setLoggedInStatus(false));
        dispatch(setLoggedUserInfo({}));
        history(`/login`)
    }
    useEffect(()=>{
        if(url[1] !=='login' && url[1] !=='register'){
        if(!userInfo.loggedInStatus) history(`/login`)
        }
    },[])
    return (
        <Box className={classes.mainContainer}>
            <Grid container justifyContent="space-between" className={classes.headerContainer}>
                <Grid className={classes.appTitle}>
                    To-Do App
                </Grid>
                <Grid>
                    <Grid className={classes.itemAlign}>
               {userInfo.loggedInStatus &&  userInfo.userInfo!==undefined && userInfo.userInfo.username && <Grid className={classes.appTitle} >
              {  userInfo.userInfo.username}
                </Grid>}
                {userInfo.loggedInStatus && <Grid className={classes.headerItem} onClick={()=>logout()}>
                   Logout
                </Grid>}
                </Grid>
                {!userInfo.loggedInStatus && <Grid className={classes.itemAlign} >
                  <Grid className={classes.headerItem} onClick={()=>history(`/login`)}>Login</Grid>
                  <Grid className={classes.headerItem} onClick={()=>history(`/register`)}>Register</Grid>
                </Grid>}
                </Grid>
            </Grid>
            {children}
        </Box>
    )
}

export default withRedux(Layout)