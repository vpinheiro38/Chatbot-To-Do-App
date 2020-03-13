const Realm = require('realm');

const UserSchema = {
	name: 'User',
	primaryKey: 'id',
	properties: {
		id: 'int',
		name: 'string',
		gender: 'int',
		productivity: 'int',
	}
};

const TaskSchema = {
	name: 'Task',
	primaryKey: 'id',
	properties: {
		id: 'int',
		// creationDate: 'date',
		active: 'bool',
		title: 'string',
		category: 'int',
		priority: 'int',
		date: 'date?',
		scheduledTime: 'bool?',
		deadline: 'date?',
		repeat: 'bool[]',
	}
};

const UserMessageSchema = {
	name: 'UserMessage',
	properties: {
		messageID: 'string',
		type: 'int',
		index: 'int?',
		answer: 'string?',
		date: 'date?'
	}
};

/* User messages types:
0: index
1: input
2: datetime
3: date
4: time
*/

const MessageSchema = {
	name: 'Message',
	properties: {
		id: 'string',
		msg: 'string',
		sender: 'int',
		responseIndex: 'int?',
	}
};

const maxMessage = 20

const realmSchema = { schema: [UserSchema, TaskSchema, UserMessageSchema, MessageSchema] }

export default class Database {
	resultsToArray = (results) => {
		return results.map((obj) => {
			return {...obj}
		})
	}

	getUser = () => {
		return new Promise(resolve => {
			Realm.open(realmSchema)
			.then(realm => {
				const users = realm.objects('User')
				
				if (!users.isEmpty()) {
					resolve({
						...users[0],
						tasks: (users[0].hasOwnProperty('tasks')) ? this.resultsToArray(users[0].tasks) : []
					})
				} else {
					resolve(undefined)
				}
	
				realm.close();
			})
			.catch(error => {
				console.log(error);
			});
		}) 
	}

	saveUser = (user) => {
		Realm.open(realmSchema)
			.then(realm => {
				try {
					realm.write(() => {
						realm.create('User', {
							id: 0,
							name: '',
							gender: 0,
							productivity: 0,
							tasks: [],
							...user,
						}, true);
					});
				} catch (error) {
					console.log("Error on updating user: ", error);
					throw new Error(error)
				}

				realm.close();
			})
			.catch(error => {
				console.log("Error on updating user: ", error);
				throw new Error(error)
			});
	}

	getMessages = () => {
		return new Promise(resolve => {
			Realm.open(realmSchema).then(realm => {
				const messages = realm.objects('Message')
				let array = this.resultsToArray(messages)
				realm.close()
				resolve(array)
			}).catch(error => {
				console.log("Error on getting messages: ", error)
				throw new Error(error)
			})
		}) 
	}

	saveMessage = (message) => {
		Realm.open(realmSchema).then(realm => {
			try {
				realm.write(() => {
					realm.create('Message', {						
						id: message.id,
						msg: message.msg,
						sender: message.sender,
						responseIndex: (message.hasOwnProperty('responseIndex') ? message.responseIndex : null)
					})
				})
			} catch (error) {
				console.log("Error on saving message: ", error);
				throw new Error(error)
			}
			
			realm.close();
		}).catch(error => {
			console.log("Error on saving message: ", error);
			throw new Error(error)
		})
	}

	deleteMessages = () => {
		Realm.open(realmSchema).then(realm => {
			try {			
				realm.write(() => {
					realm.delete(realm.objects('Message'));
				})
			} catch (error) {
				console.log("Error on deleting messages: ", error);
				throw new Error(error)
			}

			realm.close();
		}).catch(error => {
			console.log("Error on deleting messages: ", error)
			throw new Error(error)
		})
	}

	deleteOldMessages = (totalLength) => {
		Realm.open(realmSchema).then(realm => {
			try {
				realm.write(() => {
					realm.delete(realm.objects('Message').slice(0, totalLength-maxMessage));
				})
			} catch (error) {
				console.log("Error on deleting old messages: ", error);
				throw new Error(error)
			}

			realm.close();
		}).catch(error => {
			console.log("Error on deleting old messages: ", error)
			throw new Error(error)
		})
	}

	saveTask = (task) => {
		Realm.open(realmSchema).then(realm => {
			try {
				realm.write(() => {
					realm.create('Task', {
						id: task.id,
						category: 0,
						priority: 0,
						active: true,
						...task
					}, true)
				})
			} catch (error) {
				console.log("Error on saving task: ", error);
				throw new Error(error)
			}
			
			realm.close();
		}).catch(error => {
			console.log("Error on saving task: ", error)
			throw new Error(error)
		})
	}

	getTasks = () => {
		return new Promise(resolve => {
			Realm.open(realmSchema).then(realm => {
				const messages = realm.objects('Task')
				let array = this.resultsToArray(messages)
				realm.close()
				resolve(array)
			}).catch(error => {
				console.log("Error on getting tasks: ", error)
				throw new Error(error)
			})
		}) 
	}

	deleteTask = (taskId) => {
		Realm.open(realmSchema).then(realm => {
			try {			
				realm.write(() => {
					realm.delete(realm.objects('Task').filtered('id == $0', taskId));
				})
			} catch (error) {
				console.log("Error on deleting task: ", error);
				throw new Error(error)
			}

			realm.close();
		}).catch(error => {
			console.log("Error on deleting task: ", error)
			throw new Error(error)
		})
	}

	saveUserMessage = (message) => {
		Realm.open(realmSchema).then(realm => {
			try {
				realm.write(() => {
					realm.create('UserMessage', message)
				})
			} catch (error) {
				console.log("Error on saving user message: ", error);
				throw new Error(error)
			}
			
			realm.close();
		}).catch(error => {
			console.log("Error on saving user message: ", error)
			throw new Error(error)
		})
	}

	getUserMessages = () => {
		return new Promise(resolve => {
			Realm.open(realmSchema).then(realm => {
				const messages = realm.objects('UserMessage')
				let array = this.resultsToArray(messages)
				realm.close()
				resolve(array)
			}).catch(error => {
				console.log("Error on getting user messages: ", error)
				throw new Error(error)
			})
		}) 
	}

	deleteUserMessages = () => {
		Realm.open(realmSchema).then(realm => {
			try {			
				realm.write(() => {
					realm.delete(realm.objects('UserMessage'));
				})
			} catch (error) {
				console.log("Error on deleting user messages: ", error);
				throw new Error(error)
			}

			realm.close();
		}).catch(error => {
			console.log("Error on deleting user messages: ", error)
			throw new Error(error)
		})
	}
}
