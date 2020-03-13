import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../constants/colors';

export const IconApp = (props) => {
    return (
        <TouchableHighlight
                {...props}
                onPress={props.onPress}
                underlayColor={colors.underlay}
                style={[props.style, styles.touchable]}
            >
            <Icon
                name={props.name}
                type={(props.type == undefined) ? 'material-community' : props.type}
                color={(props.color == undefined) ? 'white' : props.color}
            />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 100,
        padding: 5
    }
})