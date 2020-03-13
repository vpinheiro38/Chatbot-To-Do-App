import Task from "./Task"
import store from "../redux/store"
import { addTask, setTasks } from "../redux/ChatbotActions"

export default class User {
    constructor() {
        this.info = {}
    }
    
    async initUser(db) {
        await db.getUser().then((user) => {
            if (user != undefined)  
                this.info = user
        })

        await db.getTasks().then((tasks) => {
            store.dispatch(setTasks(tasks))
        })
    }

    isUserRegistered() {
        return ((this.info.name !== null && this.info.name !== undefined) && 
                (this.info.productivity !== null && this.info.productivity !== undefined ) &&
                (this.info.gender !== null && this.info.gender !== undefined))
    }

    createTask = (arg, db) => {
        db.getUserMessages().then((userMessages) => {
            const taskList = store.getState().chatBot.tasks
            let task = new Task((taskList.length > 0) ? taskList[taskList.length-1].id + 1 : 0)
            
            for (let i = 0; i < userMessages.length; i++) {
                const message = userMessages[i]
                if (message.messageID.includes('Title')) {
                    task.setTitle(message.answer)
                } else if (message.messageID.includes('Category')) {
                    task.setCategory(message.index)
                } else if (message.messageID.includes('Priority')) {
                    task.setPriority(message.index)
                } else if (message.messageID.includes('WhatDay')) {
                    if (message.type === 0) {
                        if (message.index === 0) {
                            task.setDay(task.creationDate)
                        }
                    } else {
                        task.setDay(message.date)
                    }
                } else if (message.messageID.includes('WhatTime')) {
                    if (message.type === 0) {
                        // Não há horário marcado
                    } else {
                        task.setTime(message.date)
                    }
                } else if (message.messageID.includes('Deadline')) {
                    if (message.type === 0) {
                        task.setDeadline(undefined)
                    } else {                    
                        task.setDeadline(message.date)
                    }
                }
            }

            console.log('Task: ', task)
            db.deleteUserMessages()
            if (task.title !== '') {
                db.saveTask(task)
                store.dispatch(addTask(task))
            }
        })
    }

    setName = (arg, db) => {
        const string = arg.text
        this.info.name = string.trim();
        db.saveUser(this.info);                    
    }

    setGender = (arg, db) => {
        const index = arg.index
        this.info.gender = index;
        db.saveUser(this.info);
    }

    setProductivity = (arg, db) => {
        const index = arg.index
        this.info.productivity = index;
        db.saveUser(this.info);
    }
}