import { message } from "./Dictionary"

const addTaskPriority = [
    {...message, subID: 'addTaskPriority-0', sender: 1, msg: `E o nível de importância dela? Qual seria?`},
    {...message, subID: 'addTaskPriority-1', sender: 0, msg: [
        {type: 0, msg: 'Importantíssimo e indispensável',  highlight: false},
        {type: 0, msg: 'Mais ou menos importante', highlight: false},
        {type: 0, msg: 'Uma tarefa normal', highlight: false}], saveResponse: true},
]

const addTaskWhatDay = [
    {...message, subID: 'addTaskWhatDay-0', sender: 1, msg: '${this.expressions.randomExp(this.expressions.exp.understood)} Você acha que vai fazer isso que dia?'},
    {...message, subID: 'addTaskWhatDay-1', sender: 0, msg: [
        {type: 0, msg: 'Hoje', highlight: true},
        {type: 6, msg: 'É para esse dia:', highlight: false},
        {type: 3, highlight: false},
        // {type: 0, msg: 'Prefiro deixar você escolher o melhor dia', highlight: false},
    ], saveResponse: true},
    {...message, subID: 'addTaskWhatDay-2', sender: 1, msg: 'Combinado!'},
]

const addTaskWhatTime = [
    {...message, subID: 'addTaskWhatTime-0', sender: 1, msg: 'E sobre horário? Marco para quando?'},
    {...message, subID: 'addTaskWhatTime-1', sender: 0, msg: [
        {type: 5, msg: 'Marquei para:', highlight: false},
        {type: 4, highlight: false},
        {type: 0, msg: 'A princípio, não precisa', highlight: true},
    ], saveResponse: true},
]

const addTaskDeadline = [
    {...message, subID: 'addTaskDeadline-0', sender: 1, msg: 'Por acaso você tem um prazo para fazer isso?'},
    {...message, subID: 'addTaskDeadline-1', sender: 0, msg: [
        {type: 1, msg: 'Tenho sim! É nesse dia:', highlight: false},
        {type: 2, highlight: false},
        {type: 0, msg: 'Ainda bem que não..', highlight: true},
    ], saveResponse: true},
]

const addTaskEnd = [
    {...message, id: 'addTaskEnd-0', sender: 1, msg: '${this.expressions.randomExp(this.expressions.exp.understood)} Adicionei essa tarefa na sua lista do dia', callback: 'this.user.createTask'},
]

export const addTaskDefault = [
    ...addTaskPriority, ...addTaskWhatDay, ...addTaskWhatTime, ...addTaskEnd
].map((msg, index) => {
    return {...msg, id: ('addTaskDefault-' + index)}
})

export const addTaskTitle = [
    {...message, id: 'addTaskTitle-0', sender: 1, msg: `Qual tarefa exatamente?`},
    {...message, id: 'addTaskTitle-1', sender: 0, msg: `Digite um nome breve..`, type: 1, saveResponse: true},
    ...addTaskDefault
]

export const defaultConv = [
    {...message, id: 'defaultConv-0', sender: 0, msg: [
        {type: 0, msg: 'Preciso adicionar uma tarefa',  highlight: false}]},
    {...message, id: 'defaultConv-1', sender: 1, msg: [ addTaskTitle ], type: 1},
]

