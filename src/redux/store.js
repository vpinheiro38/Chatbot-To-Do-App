import { createStore } from 'redux';
import reducer from './ChatbotReducer';

const store = createStore(reducer);

export default store;