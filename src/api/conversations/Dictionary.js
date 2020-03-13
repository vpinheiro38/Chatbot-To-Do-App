import * as Welcome from '../conversations/Welcome'
import * as Default from '../conversations/Default'
import Conversation from "../Conversation"

export const message = {
    id: '', sender: 1, msg: '', canPass: false, type: 0
}

export default class Dictionary {

    getConversation = (stringID) => {
        const dict = {
            'welcome': new Conversation(Welcome.welcome),
            'welcome_12_0': new Conversation(Welcome.welcome_12_0),
            'welcome_12_1': new Conversation(Welcome.welcome_12_1),
            'welcome_12_2': new Conversation(Welcome.welcome_12_2),
    
            'defaultConv': new Conversation(Default.defaultConv),
            'addTaskTitle': new Conversation(Default.addTaskTitle),
            'addTaskDefault': new Conversation(Default.addTaskDefault),
        }

        return dict[stringID]
    }
}