import { SET_CHATBOT, SET_CHAT, SET_TASK, DELETE_TASK, ADD_TASK } from './types'

export const setChatbot = obj => (
    {
      type: SET_CHATBOT,
      payload: obj,
    }
);

export const setChat = storedChat => (
    {
        type: SET_CHAT,
        payload: storedChat
    }
)

export const deleteTask = taskId => (
    {
        type: DELETE_TASK,
        payload: taskId
    }
)

export const setTasks = tasks => (
    {
        type: SET_TASK,
        payload: tasks
    }
)

export const addTask = task => (
    {
        type: ADD_TASK,
        payload: task
    }
)
