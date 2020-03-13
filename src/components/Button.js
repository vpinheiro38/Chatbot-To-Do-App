import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../constants/colors';
import { numbers } from '../constants/numbers';

const ButtonRound = (props) => (
    <Button
        {...props}
        iconRight={(props.iconName != undefined)}
        icon={{name: props.iconName, color: (props.att == 'white') ? colors.mainColor : colors.white}}
        type={(props.att == 'white') ? 'solid' : props.att}
        buttonStyle={[styles.btnRound, (props.att == 'solid' ? styles.solid : (props.att == 'white') ? styles.white : {})]}
        titleStyle={[(props.att == 'white') ? styles.textWhite : {}, (props.iconName != undefined) ? {flex: 1} : {}, styles.title]}
    />
);

const styles = StyleSheet.create({
    btnRound: {
        borderRadius: 5,
        borderColor: colors.mainColor,
        marginVertical: 6,
        backgroundColor: 'gray'
    },
    solid: {
        backgroundColor: colors.mainColor
    },
    white: {
        backgroundColor: 'white',
    },
    textWhite: {
        color: colors.mainColor
    },
    title: {
        paddingHorizontal: numbers.padding
    }
})

export default ButtonRound;