import React from "react";
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRedux } from '../lib/redux';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@mui/material/Checkbox';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";

import { setTaskData } from '../components/redux/actions/todolist.action';
import Layout from "../components/layout/Layout";
import TaskModal from "../components/modal/TaskModal"; 

const useStyles = makeStyles((theme) => ({
    buttonPosition: {
        display: "block", marginLeft: "auto", marginRight: "auto", margin: "10px"
    },
    buttonContainer: {
        position: "relative", height: "calc(100vh - 100px)"
    },
    buttonCentered: {
        position: "absolute", top: "50%", left: "50%", margin: "0", marginRight: "-50%"
    },
    completedTask: {
        textDecoration: "line-through"
    },
    itemHeaderContainer: {
        display: "flex", paddingTop: "20px"
    },
    taskContainer: {
        fontSize: "20px", fontWeight: "600", paddingLeft:"20px"
    },
    actionContainer: {
        display: "flex", cursor: "auto"
    },
    checkBox: {
        padding: "12px 10px"
    },
    editIconContainer: {
        padding: "20px 10px 0px 10px"
    },
    deleteContainer: {
        padding: "20px 10px"
    },
    itemContainer: {
        color: "black", display: "flex"
    },
    itemName: {
        fontSize: "15px", fontWeight: "600"
    }
}));

const MyList = () => {
    const [open, setOpen] = React.useState({});
    const [openmodal, setOpenmodal] = React.useState(false);
    const [deleteid, setDeleteId] = React.useState(null);
    const classes = useStyles();
    const history = useNavigate();
    const dispatch = useDispatch();

    const todoList = useSelector((state) => {
        return state.todoList.taskData;
    });

    const createTodo = () => {
        history(`/create`);
    }

    const createTodoss = () => {
        history(`/create`);
    }
    const handleClickOpen = (value) => {
        setOpenmodal(true);
        setDeleteId(value)
    };

    const handleClose = () => {
        setOpenmodal(false);
    };
    const handleClick = (index) => {
        if (open[index]) {
            let openObj = {
                [index]: !open[index]
            }
            setOpen(openObj);
        } else {
            let openObj = {
                [index]: true
            }
            setOpen(openObj);
        }
    };

    const updateTask = (id) => {
        history(`/update/${id}`);
    }

    const deleteTask = () => {
        let dataArray = todoList;
        dataArray.splice(deleteid, 1)
        dispatch(setTaskData({ data: dataArray }));

        setOpenmodal(false);
    }

    const setComplete = (index) => {
        let dataArray = [...todoList];
        dataArray[index].isComplete = dataArray[index].isComplete === 1 ? 0 : 1;
        dispatch(setTaskData({ data: dataArray }));
    }

    return (
        <Layout >
            {((todoList && todoList.length === 0) || !todoList) && <Grid classes={{ root: classes.buttonContainer }}>
                <Grid classes={{ root: classes.buttonCentered }}>
                    <Button variant="contained" color="primary" classes={{ root: classes.buttonPosition }} onClick={() => { createTodo() }}>Create</Button>
                </Grid>
            </Grid>}
            {todoList && todoList.length > 0 &&
                <Grid>
                    <List
                        sx={{ width: '100vw', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <Grid container justifyContent="space-around">
                                <Grid>
                                    <ListSubheader component="div" id="nested-list-subheader" style={{ color: "black", fontWeight: "600", fontSize: "20px", paddingTop: "8px" }} >
                                        MY TODO LIST
                                    </ListSubheader>
                                </Grid>
                                <Grid >
                                    <Button variant="contained" color="primary" classes={{ root: classes.buttonPosition }} onClick={() => { createTodoss() }}>Create New Task</Button>
                                </Grid>
                            </Grid>
                        }
                    >
                        {todoList.map((item, index) => (
                            <Grid key={index}>
                                <ListItemButton style={{ border: "1px solid", margin: "10px 20px 0px 20px", boxShadow: "1px 1px 7px cornflowerblue", maxHeight: "45px" }}>
                                    <ListItemIcon>
                                        <Grid container style={{ color: "black", width: "94vw" , marginRight:"-5px"}}>
                                            <Grid xs={8} item className={classes.itemHeaderContainer} onClick={() => handleClick(index, item)}><Grid className={classes.taskContainer}> TASK {index + 1} &nbsp;&nbsp;:&nbsp;&nbsp;</Grid>
                                                <Grid className={`${item.isComplete === 1 ? classes.completedTask : null}`}>{item.title}</Grid></Grid>
                                            <Grid xs={4} item className={classes.actionContainer}> <Typography className={classes.checkBox}> <FormGroup><FormControlLabel control={<Checkbox onChange={() => setComplete(index)} defaultChecked={item.isComplete === 1 ? true:false} />} label="Completed" /></FormGroup></Typography>
                                                <Typography className={classes.editIconContainer}><EditIcon onClick={item.isComplete === 1 ? null : () => updateTask(index)} color={item.isComplete === 1 ? 'disabled' : 'inherit'} style={{ cursor: "pointer" }} /></Typography>
                                                <Typography className={classes.deleteContainer}> <DeleteIcon onClick={item.isComplete === 1 ? null : () => handleClickOpen(index)} color={item.isComplete === 1 ? 'disabled' : 'inherit'} style={{ cursor: "pointer" }} /> </Typography></Grid>
                                        </Grid>
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[index]} timeout="auto" unmountOnExit style={{ boxShadow: "1px 1px 7px cornflowerblue", margin: "0px 20px 0px 20px"}}>
                                    <List component="div" disablePadding style={{display:"flex"}}>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <Grid container direction="column" justifyContent="flex-end" style={{padding:"10px  "}}>
                                                    <Grid className={classes.itemContainer}> <Typography style={{ fontSize: "15px", fontWeight: "600" }}> DESCRIPTIONS : &nbsp;&nbsp;</Typography> <Typography style={{ fontFamily: "fantasy", fontWeight: "bold" }}>{item.description}</Typography></Grid>
                                                    <Grid className={classes.itemContainer}> <Typography style={{ fontSize: "15px", fontWeight: "600" }}>VALUE  : &nbsp;&nbsp; </Typography><Typography style={{ fontFamily: "fantasy", fontWeight: "bold" }}>{moment(item.value).format('DD-MM-YYYY')}</Typography></Grid>
                                                    <Grid className={classes.itemContainer}> <Typography style={{ fontSize: "15px", fontWeight: "600" }}>DUE DATE  : &nbsp;&nbsp;</Typography> <Typography style={{ fontFamily: "fantasy", fontWeight: "bold" }}>{moment(item.duedate).format('DD-MM-YYYY')}</Typography></Grid>
                                                </Grid>
                                            </ListItemIcon>
                                            <ListItemText primary="Starred" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                                ))
                            </Grid>
                        ))
                        }

                    </List>
                </Grid>
                
            }
            {openmodal &&
                <TaskModal handleClose={()=>handleClose()} deleteTask={()=>deleteTask()} open={openmodal}/>
            }
        </Layout>
    )
}

export default withRedux(MyList)