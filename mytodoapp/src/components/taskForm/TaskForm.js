import React from "react";
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SnackBar from "../snackbar/SnackBar";

const useStyles = makeStyles((theme) => ({
    mainContainer:{
      margin: "30px", padding: "20px", border: "1px solid", boxShadow: "1px 1px 7px grey", borderRadius: "10px"
    },
    formTitle:{
        color: "black", fontWeight: "600", marginBottom: "30px" ,fontSize:"30px"
    },
    taskName:{
        padding: "10px 400px"
    },
    btnContainer:{
        padding: "40px"
    }
}));

const TaskForm = (props) => {

    const { formTitle, proccedBtn, onCreateBtnClick, updateData} = props;
    const classes = useStyles();
    const today = new Date();
    const [value, setValue] = React.useState(updateData? updateData.value: null);
    const [title, setTitle] = React.useState(updateData? updateData.title : '');
    const [description, setDescription] = React.useState(updateData? updateData.description :'');
    const [duedate, setDuedate] = React.useState(updateData ? updateData.duedate : null);
    const [error, setError] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const history = useNavigate();
    const handleChange = (newValue) => {
        setValue(newValue);
      };
      const handleDueChange = (newValue) => {
        setDuedate(newValue);
      };

     const createTodo  = () => {
         if(!title) {
            setMsg('Task Title is required');setOpen(true);
            return
         }
        let data = {
            title : title,
            description:description,
            value:value,
            duedate:duedate,
            isComplete:0
        }
        onCreateBtnClick(data)
     }

     const handleError = (error) => {
        setError(error)
            if(error=== 'invalidDate'){
                setMsg('invalidDate');setOpen(true);
            }
            if(error=== 'minDate'){
                setMsg('Date should not be before current date');setOpen(true);
            }
     }

     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

return (
    <Grid  className={classes.mainContainer}>
    <SnackBar opensnackbar={open} message={msg} severity='error' onModalClose={handleClose}/>
    <Grid className={classes.formTitle}>{formTitle}</Grid>
    <Grid container direction="column">
        <Grid item xs={7} className={classes.taskName}>
            <TextField id="outlined-basic" label="Task Name" variant="outlined" fullWidth={true} size="small"  value={title} onChange={(e)=>setTitle(e.target.value)} required/>
        </Grid>
        <Grid item xs={7} className={classes.taskName}>
            <TextField id="outlined-basic" label="Task Discription" variant="outlined" fullWidth={true} size="small" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </Grid>
        <Grid item xs={7} className={classes.taskName}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        onError={handleError}
                        minDate={today}
                        label="Select Start Date"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </Grid>
        <Grid item xs={7} className={classes.taskName}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        onError={handleError}
                        minDate={today}
                        label="Select Due Date"
                        inputFormat="MM/dd/yyyy"
                        value={duedate}
                        onChange={handleDueChange}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </Grid>
        <Grid item className={classes.btnContainer}>
        <Button variant="contained" color="primary" onClick={()=>{history(`/mylist`)}}>Cancel</Button>&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={()=>{createTodo()}} disabled={error?true:false}>{proccedBtn}</Button>
        </Grid>
    </Grid>

</Grid>
)
}

export default TaskForm