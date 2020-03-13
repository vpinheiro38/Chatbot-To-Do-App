import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import {colors} from '../constants/colors'

const localePTBR = {
    name: 'pt-br',
    config: {
        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
        weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
        weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
        weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [às] LT',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : '%s atrás',
            s : 'segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        ordinal : '%dº'
    }
}

const Calendar = (props) => {
    return (
    <View style={styles.background}>
        <CalendarStrip
            {...props}
            locale={localePTBR}
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