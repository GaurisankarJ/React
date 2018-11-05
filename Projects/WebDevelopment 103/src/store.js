"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import ReduxThunk from "redux-thunk";

var reducer = (state = 5) => {
  return state;
};
//To create a redux store
var store = createStore(reducer);
//To get state from redux store
var currentState = store.getState();
//To define a redux action
var action = {
    type: "LOGIN"
};
//To define an action creator
function actionCreator() {
    return action;
};
//To dispatch an action event
var store = createStore(
    (state = {login: false}) => state
);
var loginAction = () => {
    return {
        type: "LOGIN"
    };
};
store.dispatch(loginAction());
//To handle an action in the store
//A reducer takes state and action as arguments, and it always returns a new state
var defaultState = {
    login: false
};
var reducer = (state = defaultState, action) => {
    if(action.type == "LOGIN") {
        return {
            login: true
        };
    } else {
        return {
            login: false
        };
    }
};
var store = createStore(reducer);
var loginAction = () => {
    return {
        type: "LOGIN"
    };
};
//To handle multiple actions, use const for action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
var defaultState = {
    authenticated: false,
    counter: 0
};
var authReducer = (state = defaultState, action) => {//state = { authenticated: false }
    switch(action.type) {
        case LOGIN:
        return {
            authenticated: true
        };
        case LOGOUT:
        return {
            authenticated: false
        };
        default:
        return state;
    }
};
var store = createStore(authReducer);
var loginAction = () => {
    return {
        type: LOGIN
    };
};
var logoutAction = () => {
    return {
        type: LOGOUT
    };
};
//To register a store listener
var count = 0;
var countLoginLogout = () => {
    count ++;
};
store.subscribe(countLoginLogout);
//To combine reducers
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
var countReducer = (state = defaultState, action) => {//state = 0
    switch(action.type) {
        case INCREMENT: 
        return {
            counter: state.counter + 1//return state + 1;
        };
        case DECREMENT:
        return {
            counter: state.counter - 1//return state - 1;
        };
        default:
        return state;
    }
};
var rootReducer = combineReducers({
    auth: authReducer,
    count: countReducer
});
var store = createStore(rootReducer);
var incrementAction = () => {
    return {
        type: INCREMENT
    };
};
var decrementAction = () => {
    return {
        type: DECREMENT
    };
};
//To send action data to store
const ADD_NOTE = "ADD_NOTE";
var defaultState = {
    message: "Initial State!"
};
var reducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_NOTE: 
        return {
            message: action.text
        };
        default:
        return state;
    }
};
var store = createStore(reducer);
var addAction = (note) => {
    return {
        type: ADD_NOTE,
        text: note
    };
};
//To handle asynchronous actions using middleware
const REQUESTING_DATA = "REQUESTING_DATA";
const RECEIVED_DATA = "RECEIVED_DATA";
var requestingDataAction = () => { 
    return { 
        type: REQUESTING_DATA 
    }; 
};
var receivedDataAction = (data) => { 
    return { 
        type: RECEIVED_DATA,
        users: data.users 
    }; 
};
var handleAsync = () => {
    return function (dispatch) {
        dispatch(requestingDataAction());
        setTimeout(function () {
            let data = {
                users: ['Jeff', 'William', 'Alice']
            }
            dispatch(receivedDataAction(data));
        }, 2500);
    }
};
var defaultState = {
    fetching: false,
    users: []
};
var asyncDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REQUESTING_DATA:
        return {
            fetching: true,
            users: []
        };
        case RECEIVED_DATA:
        return {
            fetching: false,
            users: action.users
        };
        default:
        return state;
    }
};
var store = createStore(
    asyncDataReducer,
    applyMiddleware(logger, ReduxThunk)
);
//Never mutate state
const ADD_TO_DO = "ADD_TO_DO";
const REMOVE_ITEM = "REMOVE_ITEM";
const WAKE_UP = "WAKE_UP";
var defaultState = {
    todos: [
        'Go to the store',
        'Clean the house',
        'Cook dinner',
        'Learn to code',
    ],
    status: "offline"
};
var immutableReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_TO_DO:
        return {
            todos: state.todos.concat(action.todo)//todos: [...state.todos, action.todo]
        };
        case REMOVE_ITEM:
        return {
            todos: state.todos.slice(0, action.index).concat(state.todos.slice(action.index + 1, state.todos.length))// todos: state.todos.filter((element, index) => index != action.index)
        };
        case WAKE_UP:
        //Object.assign() takes a target object and source objects and maps properties from the source objects to the target object
        return Object.assign({}, state, { status: "online" });
        default:
        return state;
    }
};
var store = createStore(immutableReducer);
var toDoAction = (todo) => {
    return {
        type: ADD_TO_DO,
        todo: todo
    };
};
var removeAction = (index) => {
    return {
        type: REMOVE_ITEM,
        index: index
    };
};
var wakeAction = () => {
    return {
        type: WAKE_UP
    };
};
var showState = () => {
    console.log(store.getState())
};
store.subscribe(showState);
//React component for export
class ReduxApp extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        console.log(store.dispatch(toDoAction("Altered State!")));
        // console.log(store.getState());
        console.log(store.dispatch(removeAction(1)));
        // console.log(store.getState());
        console.log(store.dispatch(wakeAction()));
    }
    render() {
        return (
            <div>
                <h1>Hello Redux!</h1>
                <h5>{currentState}</h5>
                <button className="btn btn-default btn-success" onClick={this.handleClick}>Render</button>
            </div>
        );
    }
}

//React Redux
//Redux Code
const ADD = "ADD";
var messageReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return state.concat(action.message);
        default:
            return state;
    }
};
var store = createStore(messageReducer);
var addMessageAction = (message) => {
    return {
        type: ADD,
        message
    };
};
//React Code
class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    handleSubmit() {
        if(this.state.input != "") {
            this.props.submitNewMessage(this.state.input);
            this.setState({
                input: ""
            });
        }
    }
    render() {
        var renderMessage = this.props.messages.map((message, index) => {
            return (
                <li key={index + 1}>
                    {message}
                </li>
            );
        })
        return (
            <div>
                <h4>Enter list item :</h4>
                <input value={this.state.input} placeholder="Enter value...." onChange={this.handleChange} />
                <button className="btn btn-default btn-success" onClick={this.handleSubmit}>Submit</button>
                <h4><u>LIST</u></h4>
                <h5>
                    {renderMessage}
                </h5>
            </div>
        );
    }
}
//Map state to props
var mapStateToProps = (state) => {
    return {
        messages: state
    };
};
//Map dispatch to props
var mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessageAction(message));
        }
    };
};
//To connect Redux to React
//If you want to omit one of the arguments to the connect method, you pass null in its place
var Container = connect(mapStateToProps, mapDispatchToProps)(DisplayMessages);
class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export { ReduxApp };
export default AppWrapper;