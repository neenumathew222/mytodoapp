import React from 'react';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        margin: "30px", padding: "20px", border: "1px solid", boxShadow: "1px 1px 7px grey", borderRadius: "10px"
    },
    formTitle: {
        color: "black", fontWeight: "600", marginBottom: "30px", fontSize: "30px", padding: "30px 0px 0px 0px"
    },
    taskName: {
        padding: "10px 600px"
    },
    btnContainer: {
        padding: "40px"
    },
    signupLink: {
        fontSize: "15px",
        color: "blue",
        textDecoration: "underline",
        cursor:"pointer"
    }
}));

const AuthForm = (props) => {

    const { text, title, onSubmit, clickOnLink, proceedBtnText } = props
    const classes = useStyles();

    const [value, setValue] = React.useState('');
    const [pass, setPass] = React.useState('');
    const submitDetailes = () => {
        let data = {
            username: value,
            password: pass
        }
        onSubmit(data)
    }
    const cancelRequest = () => {
        setValue('');
        setPass('')
    }
    return (
        <Grid>
            <Grid className={classes.formTitle}>{title}</Grid>
            <Grid container direction="column">
                <Grid item xs={7} className={classes.taskName}>
                    <TextField id="username" label="User Name" variant="outlined" fullWidth={true} size="small" value={value} onChange={(e) => setValue(e.target.value)} />
                </Grid>
                <Grid item xs={7} className={classes.taskName}>
                    <TextField id="password" type="password" label="Password" variant="outlined" fullWidth={true} size="small" value={pass} onChange={(e) => setPass(e.target.value)} />
                </Grid>
            </Grid>
            <Grid item className={classes.btnContainer}>
                <Button variant="contained" color="primary" onClick={()=> cancelRequest()}>Cancel</Button>&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={() => submitDetailes()} >{proceedBtnText}</Button>
            </Grid>
            <Grid className={classes.signupLink} onClick={()=>clickOnLink()}>{text}</Grid>
        </Grid>
    )
}

export default AuthForm