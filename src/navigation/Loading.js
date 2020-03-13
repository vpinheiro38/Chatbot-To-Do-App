import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { numbers } from '../constants/numbers';
import ChatBot from '../api/Chatbot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setChat, setChatbot, setTasks} from '../redux/ChatbotActions'

const LoadingScreen = (props) => {
    useEffect(() => {
        const chatBot = new ChatBot()
        chatBot.initChatBot().then((storedChat) => {
            setTimeout(() => {
                console.log('-- Loaded --')
                props.setChatbot(chatBot)
                props.setChat(storedChat)
                props.setTasks(chatBot.getTasks())
                props.navigation.navigate('Tabs')
            }, 1000)   
        })
    }, [])

    return (
    <View style={styles.background}>
        <Text style={styles.textTitle}>Frederico</Text>
        <ActivityIndicator size='large' color={colors.white}/>
    </View>
)};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.mainColor,
        paddingHorizontal: numbers.padding,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 27,
        margin: numbers.padding
    },
})

const mapStateToProps = (state) => {
    const { chatBot } = state
    return { chatBot }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      setChatbot, setChat, setTasks
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
