import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import Message from '../components/Message';
import { numbers } from '../constants/numbers';
import { IconApp } from '../components/Icon';
import { Input, Icon } from 'react-native-elements';
import { jumpToScreen, dateToString, timeToString } from '../api/Helper';
import { UserAnswerBtn, UserAnswerDateTime } from '../components/UserAnswer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';

let chatBotON = true
let responseIndex = undefined
let interval = undefined

const ChatScreen = (props) => {
    const chatBot = props.chatBot.obj
    const [chatMessages, setChatMessages] = useState(props.chatBot.storedChat)

    const [scroll, setScroll] = useState(undefined);
    const [showTexting, setShowTexting] = useState(false)
    const [responses, setResponses] = useState([])
    const [showUserInput, setShowUserInput] = useState(false)
    const [userInputInfo, setUserInputInfo] = useState({msg: '', callback: () => undefined})
    const [userInputText, setUserInputText] = useState('')
    const [dateTime, setDateTime] = useState(new Date())
    const [showDateTime, setShowDateTime] = useState(false)
    const [dateTimeMode, setDateTimeMode] = useState('date')

    sendMessage = (message) => {
        if (message.hasOwnProperty('callback') === true) {
            chatBot.applyUserMessage(message.callback, {text: userInputText.trim(), index: message.responseIndex});
        }

        setChatMessages(oldChat => [...oldChat, message]) 
        chatBot.saveMessage(message)
        chatBotON = true
        setShowTexting(true)
        setShowUserInput(false)
        setResponses([])
    }

    sendUserDateMessage = (message) => {
        let msg = message.msg.msg
        let type = message.msg.type
        if (message.saveResponse === true) 
            chatBot.saveResponse({messageID: (message.hasOwnProperty('subID')) ? message.subID : message.id, type, date: dateTime})
            
        let chatMessage = msg
        if (type === 6 || type === 1)
            chatMessage += ' ' + dateToString(dateTime);
        if (type === 5 || type === 1)
            chatMessage += ' ' + timeToString(dateTime);
        console.log(chatMessage, type)
        

        sendMessage({...message, msg: chatMessage})
    }

    sendUserMessage = (message, index) => {
        let msg = message.msg.msg
        if (message.saveResponse === true) 
            chatBot.saveResponse({messageID: (message.hasOwnProperty('subID')) ? message.subID : message.id, type: 0, index});

        responseIndex = index

        if (message.msg.hasOwnProperty('callback')) 
            sendMessage({...message, msg, responseIndex: index, callback: message.msg.callback});
        else
            sendMessage({...message, msg, responseIndex: index});
    }

    sendUserInput = (message) => {
        if (message.saveResponse === true) 
            chatBot.saveResponse({messageID: message.id, type: 1, answer: userInputText.trim()})
        
        sendMessage({...message, msg: userInputText.trim()})
        setUserInputText('')
    }

    stopReadChat = () => {
        clearInterval(interval)
        setShowTexting(false)

        chatBot.pushConversationId('defaultConv')
        readChat()
    }

    timerExecution = () => {
        if (chatBot.hasMessage()) {
            if (chatBotON) {
                setShowTexting(true)

                let msg = chatBot.shiftMessage()
                while (msg !== undefined && msg.canPass)
                    msg = chatBot.shiftMessage();

                if (msg !== undefined) {
                    if (msg.sender == 0) {
                        if (msg.type == 1) {
                            chatBotON = false;
                            setShowTexting(false);
                            setShowUserInput(true);
                            setUserInputInfo({...msg});
                        } else {
                            chatBotON = false;
                            setShowTexting(false);
                            setResponses(msg.msg.map((i, k) => {
                                return { ...msg, msg: i}
                            }));
                        } 
                    } else if (msg.sender == 1) {
                        if (msg.type == 1) {
                            chatBot.pushConversationId(chatBot.getConversationId(msg.msg[responseIndex]));
                            msg = chatBot.shiftMessage();
                            sendMessage(msg);
                        } else {
                            sendMessage(msg);
                        }
                    }
                }
    
                if (!chatBot.hasMessage()) {
                    stopReadChat()
                    return
                }

                msg = chatBot.getMessage()
                while (msg !== undefined && msg.canPass) {
                    chatBot.shiftMessage()
                    msg = chatBot.getMessage()                
                }

                if (msg !== undefined) {
                    if (msg.sender == 0) {
                        if (msg.type == 1) {
                            chatBotON = false
                            setShowTexting(false)
                            msg = chatBot.shiftMessage()
                            setShowUserInput(true)
                            setUserInputInfo({...msg})
                        } else {
                            chatBotON = false
                            setShowTexting(false)
                            msg = chatBot.shiftMessage()
                            setResponses(msg.msg.map((i, k) => {
                                return {
                                    ...msg,
                                    msg: i
                                }
                            }))
                        }
                    }
                }
            }
        } else {
            stopReadChat()
        }
    }
    
    readChat = () => {
        timerExecution()
        interval = setInterval(() => {
            timerExecution()
        }, numbers.delayChat)
    }
    
    useEffect(() => {    
        responseIndex = (chatMessages.length > 0) ? chatMessages[chatMessages.length-1].responseIndex : undefined 
        readChat();
    }, [])
 
    return (
    <View style={styles.background}>
        <View style={styles.topView}>
            <IconApp
                name='calendar-text'
                onPress={() => jumpToScreen(props.navigation, 'Tasks')}
            />
            <View style={styles.titleView}>
                <Text style={styles.textTitle}>{chatBot.getBotName()}
                    {showTexting && <Text style={styles.textTitle}> está digitando..</Text>}
                </Text>
                
            </View>
            <IconApp
                name='cogs'
                onPress={() => console.log('--- USER ---', chatBot.user.info)}
            />
        </View>
        <View style={styles.scrollView}>
            <ScrollView
                ref={ref => setScroll(ref)}
                onContentSizeChange={(contentWidth, contentHeight)=> scroll.scrollToEnd({animated: true})}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.contentScroll, {paddingBottom: (!showUserInput, responses.length == 0) ? numbers.padding : 0}]}
            >
                {
                    chatMessages.map((i, k) => (
                        <View key={k} style={{
                            alignSelf: (i.sender == 1) ? 'flex-start' : 'flex-end',
                            marginTop: (k > 0 && chatMessages[k-1].sender != i.sender) ? 10 : 0
                        }}>
                            <Message
                                {...i}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
        <View style={[styles.bottomView, {paddingVertical: (responses.length && !showUserInput) ? 12 : 0} ]}>
            {(showUserInput) &&
                <View style={styles.viewInput}>
                    <Input
                        value={userInputText}
                        onChangeText={(text) => setUserInputText(text)}
                        placeholder={userInputInfo.msg}
                        containerStyle={styles.ctnUserInput}
                        inputContainerStyle={styles.inpCtnUserInput}
                    />
                    <Icon
                        name='send'
                        color={colors.mainColor}
                        reverse
                        size={22}
                        containerStyle={styles.btnSendUserInput}
                        onPress={() => sendUserInput({...userInputInfo})}
                    />
                </View>
            }
            <View style={styles.btnsView}>
                {
                    responses.map((i, k) => {
                        if (i.msg.type == 0) {
                            return (
                                <UserAnswerBtn
                                    key={k}
                                    message={i}
                                    onPress={() => sendUserMessage(i, k)}
                                />
                            )
                        } else if (i.msg.type == 1 || i.msg.type == 5 || i.msg.type == 6) {
                            return (
                                <UserAnswerBtn
                                    key={k}
                                    message={i}
                                    onPress={() => sendUserDateMessage(i)}
                                />
                            )
                        } else {
                            return (
                                <UserAnswerDateTime
                                    key={k}
                                    message={i}
                                    dateTime={dateTime}
                                    onPressDate={() => {
                                        setDateTimeMode('date')
                                        setShowDateTime(true)
                                    }}
                                    onPressTime={() => {
                                        setDateTimeMode('time')
                                        setShowDateTime(true)
                                    }}
                                />
                            )
                        }
                    })
                }
            </View>
            {showDateTime && (
                <DateTimePicker
                    value={dateTime}
                    mode={dateTimeMode}
                    is24Hour={true}
                    onChange={(event, value) => {
                        const currentDate = value || dateTime;
                        setShowDateTime(Platform.OS === 'ios');
                        setDateTime(currentDate)
                    }}
                />
            )}
        </View>
    </View>
)};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    contentScroll: {
        paddingHorizontal: numbers.padding,
        paddingTop: numbers.padding,
    },
    btnsView: {
        paddingHorizontal: numbers.padding,
    },
    topView: {
        paddingVertical: 10,
        paddingHorizontal: numbers.padding,        
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    titleView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    texting: {
        color: colors.secColor,
        marginTop: 5
    },
    viewInput: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingLeft: 10,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnUserInput: {
        backgroundColor: 'white',
        borderRadius: numbers.borderRadius,
        flex: 1,
    },
    inpCtnUserInput: {
        borderBottomWidth: 0
    },
    btnSendUserInput: {
        paddingLeft: 5
    }
})

const mapStateToProps = (state) => {
    const { chatBot } = state
    return { chatBot }
};
  
export default connect(mapStateToProps)(ChatScreen);