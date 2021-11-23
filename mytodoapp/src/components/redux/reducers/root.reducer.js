import { combineReducers } from 'redux';
import todoListReducer from './todolist.reducer';

export const rootReducer  = combineReducers({
    todoList : todoListReducer
})