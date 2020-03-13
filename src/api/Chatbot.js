import Database from '../../DatabaseRealm'
import User from './User'
import Dictionary from './conversations/Dictionary'
import Expressions from './conversations/Expressions'
import store from "../redux/store"

export default class ChatBot {
    constructor() {
        this.user = new User()
        this.db = new Database()
        this.expressions = new Expressions()
        this.dictionary = new Dictionary()
        this.queueChat = []
        this.botName = 'Assistant'
    }

    getGenderWord = (word) => {
        return this.expressions.getGenderWord(word, this.user.info.gender)
    }

    getBotName() {
        return this.botName
    }

    pushConversationId(id, pointer=0) {
        const conv = this.dictionary.getConversation(id)
        this.queueChat.push(conv)
    }

    pushConversation(conversation) {
        this.queueChat.push(conversation)
    }

    hasMessage() {
        return this.queueChat.length > 0
    }

    shiftMessage() {
        if (this.hasMessage()) {
            const conv = this.queueChat[0]
            const message = conv.shiftNextMessage(this) //  Conversation.dict[conv.id][conv.pointer]
            
            if (conv.isEnded()) {
                this.queueChat.shift();
            }
            
            return message
        }

        return undefined
    }

    getMessage() {
        if (this.hasMessage()) {
            const conv = this.queueChat[0]
            const message = conv.getNextMessage(this) // Conversation.dict[conv.id][conv.pointer]

            return message
        }

        return undefined
    }

    getTasks = () => {
        return store.getState().tasks
    }

    deleteTask = (id) => {
        this.user.tasks
        this.db.deleteTask(id)
    }

    saveMessage(msg) {
        this.db.saveMessage(msg)
    }

    saveResponse(response) {
        this.db.saveUserMessage(response)
    }

    getChatFromDatabase() {
        return this.db.getMessages()
    }

    fillFuncTemplate(templateString, arg) {
        return new Function('return ' + templateString + ";").apply(this).apply(this, [arg, this.db]);
    }

    applyUserMessage(callback, response) {
        return this.fillFuncTemplate(callback, response)
    }

    getConversationId(conversation) {
        return conversation[0].id.split('-')[0]
    }

    initChatBot() {
        return new Promise((resolve) => { 
            this.user.initUser(this.db)
            this.getChatFromDatabase().then((chat) => {
                const previousMessage = (chat.length > 0) ? chat[chat.length-1] : undefined
                let convId = 'welcome'

                if (this.user.isUserRegistered()) {
                    console.log('-=-=-=-=- User found -=-=-=-=-')
                    convId = 'defaultConv'
                }

                if (previousMessage !== undefined) {
                    const id = previousMessage.id.split('-')
                    let conversation = this.dictionary.getConversation(id[0])
                    conversation.setPointer(parseInt(id[1]) + 1)

                    if (!conversation.isEnded()) {
                        this.pushConversation(conversation.pushObj(previousMessage))
                    } else {
                        this.pushConversationId(convId)
                    }
                } else {
                    this.pushConversationId(convId)
                }

                resolve(chat)                    
            })          
        })        
    }
}
