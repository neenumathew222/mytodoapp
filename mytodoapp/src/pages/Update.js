import React from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setTaskData } from '../components/redux/actions/todolist.action';
import { withRedux } from '../lib/redux';
import TaskForm from "../components/taskForm/TaskForm";
import Layout from "../components/layout/Layout";


const UpdateTask = () => {
    const url = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const id = parseInt(url.id);
    const todoList = useSelector((state) => {
        return state.todoList.taskData;
    });

    const updateTask = (data) => {
        let dataArray = todoList;
        dataArray[id] = data
        dispatch(setTaskData({ data: dataArray }));
        history(`/mylist`);
    }

    return (
        <Grid>
            <Layout>
                <TaskForm formTitle="UPDATE YOUR TASK" proccedBtn="UPDATE" onCreateBtnClick={(data) => updateTask(data)} updateData={todoList[id]} />
            </Layout>
        </Grid>
    )

}

export default withRedux(UpdateTask)