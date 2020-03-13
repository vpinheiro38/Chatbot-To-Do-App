import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonRound from './Button';
import { dateToString, timeToString } from '../api/Helper';
import { numbers } from '../constants/numbers';

export const UserAnswerDateTime = (props) => {
    return (        
        <View style={styles.viewDateTime}>
            {(props.message.msg.type == 4 || props.message.msg.type == 2) && <ButtonRound
                title={timeToString(props.dateTime)}
                att={(props.message.msg.highlight) ? 'solid' : 'white'}
                iconName='edit'
                onPress={props.onPressTime}
                containerStyle={{flex: 1, marginRight: (props.message.msg.type == 2) ? numbers.padding/2 : 0}}
            />}            
            {(props.message.msg.type == 3 || props.message.msg.type == 2) && <ButtonRound
                title={dateToString(props.dateTime)}
                att={(props.message.msg.highlight) ? 'solid' : 'white'}
                iconName='edit'
                onPress={props.onPressDate}
                containerStyle={{flex: 1}}
            />}
        </View>
    )
}

export const UserAnswerBtn = (props) => {
    return (
        <ButtonRound
            onPress={props.onPress}
            title={props.message.msg.msg}
            att={(props.message.msg.highlight) ? 'solid' : 'white'}
        />
    );
}

const styles = StyleSheet.create({
    viewDateTime: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})