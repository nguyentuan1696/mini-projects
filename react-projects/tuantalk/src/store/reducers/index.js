import {combineReducers} from 'redux';
import scroll from './scroll/scroll.reducer';
import accountStore from './account/account.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        scroll,
        accountStore,
        ...asyncReducers
    });

export default createReducer;
