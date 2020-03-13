import { TabActions } from '@react-navigation/native';

export const jumpToScreen = (navigation, screen, params={}) => {
    const jumpToAction = TabActions.jumpTo(screen, params);
    navigation.dispatch(jumpToAction);
}

export const dateToString = (date) => {
    return date.toLocaleDateString()
}

export const timeToString = (time) => {
    return time.toLocaleTimeString().slice(0, time.toLocaleTimeString().length-3)
}