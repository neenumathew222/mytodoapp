export const SET_TASK_DATA = "SET_TASK_DATA";
export const SEG_LOGGEDIN_STATUS = "SEG_LOGGEDIN_STATUS";
export const SET_LOGGEDIN_USER_INFO = "SET_LOGGEDIN_USER_INFO";

export const setTaskData = (data) => ({
    type: SET_TASK_DATA,
    payload: data,
});

export const setLoggedInStatus = (data) => ({
    type : SEG_LOGGEDIN_STATUS,
    payload : data
})

export const setLoggedUserInfo = (data) => ({
    type : SET_LOGGEDIN_USER_INFO,
    payload : data
})