import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../_reducers/user.reducer';

//you can create multiple store
const mainReducer = combineReducers({
    user: reducer
});

//https://github.com/zalmoxisus/redux-devtools-extension

//passing the main store to the createStore function
//use thunk to implement assynchronus call to API

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));

export default store;