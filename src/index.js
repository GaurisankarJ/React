"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "./style.scss";

//Redux Store

//React Component
class PomodoroClock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="app">
                <div id="title" className="main-title">
                Pomodoro Clock
                </div>
                <div id="break" className="length-control">
                BREAK
                </div>
                <div id="session" className="length-control">
                SESSIONS
                </div>
                <div id="timer" className="timer">
                TIMER
                </div>
                <div id="timer-control" className="timer-control">
                TIMER CONTROL
                </div>
                <div id="author" className="author">
                    Coded by <a href="https://github.com/GaurisankarJ/" target="_blank">Sankar</a>
                </div>
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />
            </div>
        );
    }
}
class Presentation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <PomodoroClock />
            </div>
        );
    }
}
ReactDOM.render(
    <Presentation />,
    document.getElementById("container")
);

