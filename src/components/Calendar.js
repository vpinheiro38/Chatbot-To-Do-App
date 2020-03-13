import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import {colors} from '../constants/colors'

const Calendar = (props) => {
    return (
    <View style={styles.background}>
        <CalendarStrip
            {...props}
            ref={(ref) => props.setRef(ref)}
            selectedDate={props.selDate}
            onDateSelected={(date) => props.setDate(date.toDate())}
            style={{height:100}}
            customDatesStyles={[{
                dateContainerStyle: {
                    backgroundColor: colors.underlay,
                    borderColor: colors.secColor
                }
            }]}
            calendarHeaderStyle={{color: colors.white}}
            dateNumberStyle={{color: colors.white }}
            dateNameStyle={{color: colors.white}}
            highlightDateNumberStyle={{color: colors.secColor}}
            highlightDateNameStyle={{color: colors.secColor}}
            leftSelector={
                <Icon name='chevron-left' color={colors.white}/>
            }
            rightSelector={
                <Icon name='chevron-right' color={colors.white}/>
            }
        />
    </View>
)};

const styles = StyleSheet.create({ 
    background: {
        // marginHorizontal: numbers.padding
        // backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        // paddingVertical: 20
    }
})

export default Calendar;