import { combineReducers } from 'redux';
import { SET_CHATBOT, SET_CHAT, DELETE_TASK, SET_TASKS, ADD_TASK } from './types';

const INITIAL_STATE = {
  obj: undefined,
  storedChat: [],
  tasks: []
};

const chatBotReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CHATBOT:
			const newObj = action.payload;

			return { ...state, obj: newObj };
		case SET_CHAT:
			const newChat = action.payload;

			return { ...state, storedChat: newChat };
		case SET_TASKS:
			const newTasks = action.payload;

			return {...state, tasks: newTasks}
		case DELETE_TASK:
			const taskId = action.payload;

			return {...state, tasks: state.tasks.filter((task) => {
				return task.id != taskId
			})}
		case ADD_TASK:
			const task = action.payload;
			
			return {...state, tasks: [...new Set([...state.tasks, task])] }
		default:
			return state
	}
};

export default combineReducers({
  chatBot: chatBotReducer,
});