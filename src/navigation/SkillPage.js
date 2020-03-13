import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colors } from '../constants/colors';
import { numbers } from '../constants/numbers';
import { IconApp } from '../components/Icon';
import Calendar from '../components/Calendar';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTask } from '../redux/ChatbotActions'
import { dateToString, timeToString } from '../api/Helper';

const SkillPageScreen = (props) => {
    let tasks = props.chatBot.tasks
    const [calendarRef, setCalendarRef] = useState(undefined)
    const [selDate, setDate] = useState(new Date())
    const [data, setData] = useState(props.chatBot.tasks)
    const [dateTasks, setDateTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setData(props.chatBot.tasks)
        if (selDate != undefined) {
            setDateTasks(data.filter((task, index) => {                
                return dateToString(task.date) === dateToString(selDate)
            }))
        }
    }, [props.chatBot])

    useEffect(() => {
        setIsLoaded(false)    
        if (selDate != undefined) {
            setDateTasks(data.filter((task, index) => {                
                return dateToString(task.date) === dateToString(selDate)
            }))
        }
        setIsLoaded(true)
    }, [selDate])

    renderList = ({ item, index, drag, isActive }) => {
        return (
            <View>
                <ListItem
                    title={item.title}
                    titleStyle={{
                        color: isActive ? 'white' : 'black'
                    }}
                    subtitle={(item.scheduledTime) ? timeToString(item.date) : undefined}
                    subtitleStyle={{
                        color: isActive ? 'white' : 'gray'
                    }}
                    containerStyle={[styles.listItemContainer, {                    
                        backgroundColor: isActive ? colors.secColor : 'white',
                    }]}
                    leftIcon={{
                        name: isActive ? 'drag-vertical' : 'inbox', 
                        type: 'material-community', 
                        reverse: true,
                        color: colors.secColor,
                        onLongPress: drag,
                        onPress: drag,
                    }}
                    rightIcon={{
                        name: 'delete',
                        type: 'material-community',
                        color: colors.background,
                        iconStyle: {marginHorizontal: numbers.padding},
                        onPress: () => {
                            props.chatBot.obj.deleteTask(index)
                            props.deleteTask(item.id)
                            setData(data.filter((task) => {
                                return task.id != item.id
                            }))
                        }
                    }}
                    contentContainerStyle={{marginLeft: -10}}
                    underlayColor='transparent'
                />
            </View>
        )
    }

    return (
    <View style={styles.background}>
        <IconApp
            name='arrow-right'
            style={styles.backIcon}
            onPress={() => props.navigation.goBack()}
        />
        <View style={styles.topView}>
            <Calendar 
                setRef={setCalendarRef}
                setDate={setDate}
                selDate={selDate}
            />
        </View>
        {(!isLoaded) && <ActivityIndicator
            size='large'
        />}
        <DraggableFlatList
            data={dateTasks}
            renderItem={renderList}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => setData(data)}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 10}}
            activationDistance={10}
        />
    </View>
)};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
        // paddingHorizontal: numbers.padding,
    },
    topView: {
        padding: 10,
        paddingHorizontal: numbers.padding,
        marginHorizontal: -numbers.padding/2,
        backgroundColor: colors.mainColor,
    },
    topTopView: {
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
        // paddingLeft: 45
    },
    scrollView: {
        paddingHorizontal: numbers.padding,
        marginTop: 20
    },
    listItemContainer: {
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
        marginHorizontal: 20
    },
    backIcon: {
        position: 'absolute',
        zIndex: 1,
        right: 15, top: 23,
    }
})


const mapStateToProps = (state) => {
    const { chatBot } = state
    return { chatBot }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      deleteTask
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(SkillPageScreen);