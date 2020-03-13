import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../constants/colors';
const screenWidth = Dimensions.get('screen').width

const Message = (props) => (
    <View style={[styles.view, (props.sender == 1) ? {} : styles.user]}>
        <Text style={(props.sender == 1) ? {} : styles.userText}>
            {props.msg}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white',
        width: undefined,
        alignSelf: 'flex-start',
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: 2*screenWidth/3
    },
    user: {
        backgroundColor: colors.secColor,
    },
    userText: {
        color: 'white'
    }
})

export default Message;
