"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "./style.scss";

//Redux Store
const POWER = "POWER";
const BANK = "BANK";
const INC_VOLUME = "INC_VOLUME";
const DEC_VOLUME = "DEC_VOLUME";
const defaultState = {
    power: false,
    bank: false,
    volume: 50
};
const drumReducer = (state = defaultState, action) => {
    switch(action.type) {
        case POWER:
            if(state.power == false) {
                state.power = true;
            } else {
                state.power = false;
            }
            return state;
        case BANK: 
            if(state.bank == false) {
                state.bank = true;
            } else {
                state.bank = true;
            }
            return state;
        case INC_VOLUME:
            state.volume ++;
            return state;
        case DEC_VOLUME: 
            state.volume --;
            return state;
        default:
            return state;
    }
};
const powerAction = () => {
    return {
        type: POWER
    };
};
const bankAction = () => {
    return {
        type: BANK
    };
};
const incVolAction = () => {
    return {
        type: INC_VOLUME
    };
};
const decVolAction = () => {
    return {
        type: DEC_VOLUME
    };
};
const store = createStore(drumReducer);
store.subscribe(() => console.log(store.getState()));