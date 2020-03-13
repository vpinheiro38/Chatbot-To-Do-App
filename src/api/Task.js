export default class Task {
    constructor(id) {
        this.id = id
        this.creationDate = new Date()
        this.active = true
        
        this.title = ''
        this.category = 0
        this.priority = 0
        this.date = new Date()
        this.scheduledTime = false
        this.deadline = undefined        
        // this.repeat = undefined
    }

    setTitle = (arg) => this.title = arg;
    setCategory = (arg) => this.category = arg;
    setPriority = (arg) => this.priority = arg;
    setDay = (arg) => {
        this.date = arg
    };
    setTime = (arg) => {
        this.date.setHours(arg.getHours(), arg.getMinutes())
        this.scheduledTime = true
    };
    setDeadline = (arg) => this.deadline = arg;
}