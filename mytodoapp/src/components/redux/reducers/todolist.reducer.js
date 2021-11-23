import {
 SET_TASK_DATA, SEG_LOGGEDIN_STATUS, SET_LOGGEDIN_USER_INFO
} from '../actions/todolist.action'


const initialState = {
    taskData : [],
    loggedInStatus : false,
    userInfo : {}
}

const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK_DATA : return {
            ...state,
            taskData : action.payload.data
        };
        case SEG_LOGGEDIN_STATUS : return {
            ...state,
            loggedInStatus : action.payload.data
        };
        case SET_LOGGEDIN_USER_INFO : return {
            ...state,
            userInfo : action.payload.data
        };
        default:
                return { ...state };
    }

}

export default todoListReducer