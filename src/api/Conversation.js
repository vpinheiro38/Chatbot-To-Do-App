export default class Conversation {
    constructor(convList, pointer=0) {
        this.id = convList[0].id.split('-')[0],
        this.messages = convList
        this.pointer = pointer
    }

    fillTemplate(templateString, templateVars) {
        return new Function("return `" + templateString + "`;").call(templateVars);
    }

    pushObj(previousMessage) {
        if (Array.isArray(this.messages[0].msg) && this.messages[0].sender === 1) {
            return this.getConversationId(this.messages[0].msg[ previousMessage.responseIndex ])
        } else {
            return this
        }
    }

    setPointer(pointer) {
        this.pointer = pointer
    }

    isEnded() {
        return this.pointer >= this.messages.length
    }

    lastMessages(index) {
        return this.messages.filter((i, k) => k > parseInt(index))
    }

    getNextMessage(chatBot) {
        let nextMsg = this.messages[this.pointer];

        if (nextMsg !== undefined) {
            if (Array.isArray(nextMsg.msg)) {
                if (nextMsg.sender === 0) {
                    nextMsg.msg = nextMsg.msg.map((i) => {
                        return {
                            ...i,
                            msg: this.fillTemplate(i.msg, chatBot)
                        }
                    })
                }
            } else {
                nextMsg.msg = this.fillTemplate(nextMsg.msg, chatBot);
            }
        }


        return nextMsg
    }

    shiftNextMessage(chatBot) {
        if (!this.isEnded()) {
            const nextMsg = this.getNextMessage(chatBot)
            // this.messages.shift()
            this.pointer++;
            return nextMsg
        }

        return undefined
    }
}

// const _ = [
//     {id: '_-0', sender: 1, msg: ''},
// ]

/* User messages types:
0: btn normal
1: btn pra pegar o datetime
2: datetime
3: date
4: time
5: btn pra pegar o time
6: btn pra pegar o date
*/