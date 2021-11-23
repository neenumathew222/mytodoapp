import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { withRedux } from '../lib/redux';
import { setTaskData } from '../components/redux/actions/todolist.action';
import TaskForm from "../components/taskForm/TaskForm";
import Layout from "../components/layout/Layout";

const Create = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const todoList = useSelector((state) => {
        return state.todoList.taskData;
    });

    const createTodo = (data) => {
        let dataArray = todoList;
        dataArray.push(data)
        dispatch(setTaskData({ data: dataArray }));
        history(`/mylist`);
    }



    return (
        <Layout>
            <TaskForm formTitle="CREATE YOUR TODO LIST" proccedBtn="CREATE" onCreateBtnClick={(data) => createTodo(data)} />
        </Layout>

    )
}

export default withRedux(Create)