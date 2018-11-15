"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "./style.scss";

//Redux Store
const SET_BREAK = "SET_BREAK";
const SET_SESSION = "SET_SESSION";
const START_STOP = "START_STOP";
const RESET = "RESET";
const REDUCE_TIMER = "REDUCE_TIMER";
const defaultState = {
    break: 5,
    session: 25,
    running: false,
    timer: 1500,
    type: "Session",
    alarmColor: { color: "white" } 
};
const clockReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_BREAK: 
            if(action.todo == "+") {
                return Object.assign({}, state, state.break = state.break + 1)
            } else if(action.todo == "-" && state.break > 1) {
                return Object.assign({}, state, state.break = state.break - 1)
            } else {
                return state;
            }
        case SET_SESSION:
            if(action.todo == "+") {
                return Object.assign({}, state, state.session = state.session + 1)
            } else if(action.todo == "-" && state.session > 1) {
                return Object.assign({}, state, state.session = state.session - 1)
            } else {
                return state;
            }
        case START_STOP:
            return Object.assign({}, state, state.running = !state.running);
        case RESET:
            return Object.assign({}, state, defaultState);
        case REDUCE_TIMER: 
            return Object.assign({}, state, state.timer = state.timer - 1);
        default:
            return state;
    }
};
const setBreakAction = (operation) => {
    return {
        type: SET_BREAK,
        todo: operation
    };
};
const setSessionAction = (operation) => {
    return {
        type: SET_SESSION,
        todo: operation
    };
};
const startStopAction = () => {
    return {
        type: START_STOP
    };
};
const resetAction = () => {
    return {
        type: RESET
    };
};
const reduceTimerAction = () => {
    return {
        type: REDUCE_TIMER
    };
};
const store = createStore(clockReducer);
store.subscribe(() => console.log(store.getState()));

//React Component
class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "25:00"
        };
        this.handleClickBreak = this.handleClickBreak.bind(this);
        this.handleClickSession = this.handleClickSession.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClickBreak(event) {
        this.props.handleBreak(event.target.value);
    }
    handleClickSession(event) {
        this.props.handleSession(event.target.value);
    }
    handleClick() {
        this.props.handleStartStop();
        //Enter Timer Logic
    }
    render() {
        return (
            <div id="app">
                <div id="title" className="main-title">
                Pomodoro Clock
                </div>
                <div id="break" className="length-control">
                    <div id="break-label">Break Length</div>
                    <button id="break-decrement" className="btn-level" value="-" onClick={this.handleClickBreak}>
                        <i className="fa fa-arrow-down fa-2x" />
                    </button>
                    <div id="break-length" className="btn-level">{this.props.state.break}</div>
                    <button id="break-increment" className="btn-level" value="+" onClick={this.handleClickBreak}>
                        <i className="fa fa-arrow-up fa-2x" />
                    </button>
                </div>
                <div id="session" className="length-control">
                    <div id="session-label">Session Length</div>
                    <button id="session-decrement" className="btn-level" value="-" onClick={this.handleClickSession}>
                        <i className="fa fa-arrow-down fa-2x" />
                    </button>
                    <div id="session-length" className="btn-level">{this.props.state.break}</div>
                    <button id="session-increment" className="btn-level" value="+" onClick={this.handleClickSession}>
                        <i className="fa fa-arrow-up fa-2x" />
                    </button>
                </div>
                <div id="timer" className="timer" style={this.props.state.alarmColor}>
                    <div className="timer-wrapper">
                        <div id="timer-label">{this.props.state.type}</div>
                        <div id="time-left">{this.props.state.display}</div>
                    </div>
                </div>
                <div id="timer-control" className="timer-control">
                    <button id="start-stop" onClick={this.handleClick}>
                        <i className="fa fa-play fa-2x" />
                        <i className="fa fa-pause fa-2x" />
                    </button>
                    <button id="reset" onClick={this.props.handleReset}>
                        <i className="fa fa-refresh fa-2x" />
                    </button>
                </div>
                <div id="author" className="author">
                    Coded by <a href="https://github.com/GaurisankarJ/" target="_blank">Sankar</a>
                </div>
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />
            </div>
        );
    }
}

//Map state, dispatch to props
const mapStatetoProps = (state) => {
    return {
        state: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleBreak: (event) => {
            dispatch(setBreakAction(event));
        },
        handleSession: (event) => {
            dispatch(setSessionAction(event));
        },
        handleStartStop: () => {
            dispatch(startStopAction());
        },
        handleReset: () => {
            dispatch(resetAction());
        },
        handleTimer: () => {
            dispatch(reduceTimerAction());
        }
    };
};

//Connect Redux and React
const Container = connect(mapStatetoProps, mapDispatchToProps)(PomodoroClock);

class Presentation extends React.Component {
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
ReactDOM.render(
    <Presentation />,
    document.getElementById("container")
);

