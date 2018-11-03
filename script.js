"use strict";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

var JSX = <h1>Hello JSX!</h1>;
var JSX_1 = (
    <div className="myDiv">
        <h1>Heading!!</h1>
        <br />
        {/*Every element must be closed*/}
        <p>Paragraph!!</p>
        <ul>
            <li className="list-group-item">ListElement-1!!</li>
            <hr />
            <li className="list-group-item">ListElement-2!!</li>
            <hr />
            <li className="list-group-item">ListElement-3!!</li>
        </ul>
    </div>
);
//To create a React component
var MyComponent_1 = function () {
    return (
        <div>This is a component.</div>
    );
};
class MyComponent_2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>This is a component too.</div>
        );
    }
}
//To create a component with composition
const ChildComponent_1 = () => {
    return (
        <div>
            <h6>I am child 1.</h6>
        </div>
    );
};
const ChildComponent_2 = () => {
    return (
        <div>
            <h6>I am child 2.</h6>
        </div>
    );
}
const FirstParent = () => {
    return (
        <div>
            <h5>I am parent 1, the parent of child 1 and child 2.</h5>
            <ChildComponent_1 />
            <ChildComponent_2 />
        </div>
    );
}
class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4>I am parent of parent 1.</h4>
                <FirstParent />
            </div>
        );
    }
}
//You can render JSX elements, stateless functional components, and ES6 class components within other components
class SuperParent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>I am super parent.</h3>
                <FirstParent />
                <ParentComponent />
            </div>
        )
    }
}
//To pass props to a stateless functional component
const CurrentDate = (props) => {
    return (
        <div>
            <h5>Current date is {props.date}.</h5>
        </div>
    );
};
class Calender extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>What date is it?</h3>
                <CurrentDate date={Date()} />
            </div>
        );
    }
}
//To pass arrays as props
const List = (props) => {
    return (
        <h5>{props.tasks.join(", ")}</h5>
    );
};
class ToDo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>To do list:</h2>
                <h3>Today, </h3>
                <List tasks={["Eat", "Sleep", "Code", "Repeat"]} />
                <h3>Tomorrow, </h3>
                <List />
                <h3>Day after.... </h3>
                {/*If you pass null as the value for a prop, it will remain null*/}
                <List tasks={[null]} />
            </div>
        );
    }
}
//To define default properties
List.defaultProps = { tasks: ["Eat", "Sleep", "Code", "Repeat"] };
const SetScore = (props) => {
    return (
        <div>
            <h4>Name : {props.name}</h4>
            <h5>The score is : {props.score}</h5>
        </div>
    );
};
class DisplayScore extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2><u>SCORE</u></h2>
                <SetScore score={99} name="Sankar" />
                <SetScore />
            </div>
        );
    }
}
SetScore.defaultProps = { score: 100, name: "God" }
//To define the props you expect
//https://reactjs.org/docs/typechecking-with-proptypes.html
const Items = props => {
    return (
        <div>
            <h4>The number of items in cart : {props.qty}</h4>
        </div>
    );
};
Items.defaultProps = { qty: 0 };
Items.propTypes = { qty: PropTypes.number.isRequired };
class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Items qty={9} />
            </div>
        );
    }
}
//Using this.props with ES6 class components
class ReturnTempPassword extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const tempPassword = this.props.tempPassword;//Alternate way to access props
        return (
            <div>
                <h6><strong><strong>Temporary password: {tempPassword}</strong></strong></h6>
            </div>
        );
    }
}
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>Your temporary password is,</h3>
                <ReturnTempPassword tempPassword="PASSWORD" />
            </div>
        );
    }
}
//A stateless functional component is any function you write which accepts props and returns JSX.A stateless component, on the other hand, is a class that extends React.Component, but does not use internal state 
//To create a stateful component and render state in UI
class StatefulComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Sankar",
            nickname: "Shanks"
        };
    }
    render() {
        const nickname = this.state.nickname;
        return (
            <div>
                <h3>The name is {this.state.name}.</h3>
                <h4>You can call me {nickname}.</h4>
            </div>
        );
    }
}
//To set the state
class SetTheState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: "Initial State",
            countState: 0
        };
        this.handleClick = this.handleClick.bind(this); {/*Binding this to a class method*/ }
    }
    handleClick() {
        this.setState({
            theState: "State",
            countState: this.state.countState + 1
        });
    }
    render() {
        return (
            <div>
                <h2><u>The STATE</u></h2>
                <h4>{this.state.theState}<sup>{this.state.countState}</sup></h4>
                <button className="btn btn-default btn-primary" onClick={this.handleClick}>Change State</button>
            </div>
        );
    }
}
//To toggle an element
class ToggleState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }
    toggleVisibility() {
        if (this.state.visibility) {
            this.setState({
                visibility: false
            });
        } else {
            this.setState({
                visibility: true
            })
        }
    }
    render() {
        if (this.state.visibility) {
            return (
                <div>
                    <button className="btn btn-default btn-primary" onClick={this.toggleVisibility}>Hide</button>
                    <h4>NOW YOU SEE ME!!</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn btn-default btn-primary" onClick={this.toggleVisibility}>Show</button>
                </div>
            );
        }
    }
}
//Simple counter
class SimpleCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    increment() {
        this.setState({
            count: this.state.count + 1
        });
    }
    decrement() {
        this.setState({
            count: this.state.count - 1
        });
    }
    reset() {
        this.setState({
            count: 0
        });
    }
    render() {
        return (
            <div>
                <h3>The count is : {this.state.count}</h3>
                <button className="btn btn-default btn-success" onClick={this.increment}>Increment</button>
                <button className="btn btn-default btn-danger" onClick={this.decrement}>Decrement</button>
                <button className="btn btn-default btn-primary" onClick={this.reset}>Reset</button>
            </div>
        );
    }
}
//To create a controlled input
class ControlledInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    render() {
        return (
            <div>
                <input value={this.state.value} placeholder="Enter input..." onChange={this.handleChange} />
                <h4>Controlled input : {this.state.input}</h4>
            </div>
        );
    }
}
//To create a controlled form
class ControlledForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            submit: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault(); {/*To prevent the default form submit behavior which will refresh the web page*/ }
        this.setState({
            input: "",
            submit: this.state.input
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.input} placeholder="Enter what to submit..." onChange={this.handleChange} />
                    <button className="btn btn-default btn-primary" type="submit">Submit</button>
                </form>
                <h2>{this.state.submit}</h2>
            </div>
        );
    }
}
//Pass state, callback as props to child components
//State flows in one direction down the tree of your application's components, from the stateful parent component to child components
class DisplayString extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}
class DisplayNumber extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>{this.props.numb}</h3>
            </div>
        );
    }
}
class GetNumber extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Enter number: </h2>
                <input value={this.props.value} placeholder="Number..." onChange={this.props.handleChange} />
            </div>
        );
    }
}
class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "CR",
            numb: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        console.log(typeof event.target.value, event.target.tagName);
        this.setState({
            numb: event.target.value
        });
    }
    render() {
        return (
            <div>
                <DisplayString text={this.state.text} />
                <DisplayNumber numb={this.state.numb} />
                <GetNumber value={this.state.numb} handleChange={this.handleChange} />
            </div>
        );
    }
}
//Using lifecycle methods
//Component lifecycles can be broken down into 4 stages, Initialization -> Mounting -> Updating -> Unmounting
//componentWillMount(), componentDidMount(), componentWillUnmount(), componentWillReceiveProps(), componentWillUpdate(), componentDidUpdate(), shouldComponentUpdate()
//The componentWillMount() method is called before the render() method when a component is being mounted to the DOM
//The componentDidMount() method is called after a component is mounted to the DOM, the best practice with React is to place API calls or any calls to your server in this lifecycle method, it is also the best place to attach any event listeners you need to add for specific functionality
//The componentWillUnmount() method is called to do any clean up on React components before they are unmounted and destroyed
//The componentWillReceiveProps() method is called whenever a component is receiving new props, componentWillReceiveProps -> componentWillUpdate -> componentDidUpdate
//The componentDidUpdate() method is called immediately after a component re-renders
//The shouldComponentUpdate() method can be called when child components receive new state or props, and declare specifically if the components should update or not
class LifeCycles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: 0,
            message: "",
            visibility: false,
            numb: "",
            val: 0
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNum = this.addNum.bind(this);
    }
    handleEnter() {
        this.setState({
            message: this.state.message + "You pressed enter!!"
        });
    }
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.handleEnter();
        }
    }
    toggleVisibility() {
        if (this.state.visibility) {
            this.setState({
                visibility: false
            });
        } else {
            this.setState({
                visibility: true
            });
        }
    }
    handleChange(event) {
        this.setState({
            numb: parseInt(event.target.value)
        });
    }
    addNum() {
        this.setState({
            val: this.state.val + this.state.numb,
            numb: ""
        });
    }
    componentWillMount() {
        console.log("componentWillMount()");
    }
    componentDidMount() {
        //Mock API call, sets state after 2.5 seconds to simulate calling a server to retrieve data
        setTimeout(() => {
            this.setState({
                users: 1273,
            });
        }, 2500);
        //Adding event listeners
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    render() {
        return (
            <div>
                <h4><u>Life Cycles</u></h4>
                <h5>componentWillMount()</h5>
                <h5>componentDidMount()</h5>
                <h6>USERS : {this.state.users}</h6>
                <h5>componentWillUnmount()</h5>
                <h6>{this.state.message}</h6>
                <Dialog visibility={this.state.visibility} value={this.state.value} />
                <button className="btn btn-default btn-primary" onClick={this.toggleVisibility}>Toggle</button>
                <OnlyEven value={this.state.numb} handleChange={this.handleChange} addNum={this.addNum} val={this.state.val} />
                <h6>STATE VALUE: {this.state.val}</h6>
            </div>
        );
    }
}
class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);

    }
    componentWillUpdate() {
        console.log("Component is about to update...");
    }
    componentDidUpdate() {
        console.log("Component updated!!")
    }
    render() {
        if (this.props.visibility) {
            return (
                <div>
                    <h5>componentWillReceiveProps()</h5>
                    <h5>componentWillUpdate()</h5>
                    <h5>componentDidUpdate()</h5>
                </div>
            );
        } else {
            return (
                <div>
                    <h6>Hidden!</h6>
                </div>
            );
        }
    }
}
class OnlyEven extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should I update?");
        if (nextProps.val % 2 === 0) {
            console.log("Yes!");
            return true;
        } else {
            console.log("No!");
            return false;
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("Props received!");
    }
    componentDidUpdate() {
        console.log("Component Re-Rendered!!");
    }
    render() {
        return (
            <div>
                <h5>shouldComponentUpdate()</h5>
                <input value={this.props.value} placeholder="Number to add..." onChange={this.props.handleChange} />
                <button className="btn btn-default btn-primary" onClick={this.props.addNum}>Add</button>
                <h6>PROPS VALUE : {this.props.val}</h6>
            </div>
        );
    }
}
//To add inline styles
//As a rule, any hyphenated style properties are written using camel case in JSX
//All property value length units (like height, width, and fontSize) are assumed to be in px unless otherwise specified
//If you want to use em, for example, you wrap the value and the units in quotes, like { fontSize: "4em" }
//Other than the length values that default to px, all other property values should be wrapped in quotes
class Styles extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            color: "purple",
            fontSize: 40,
            border: "2px solid purple"
        }
        return (
            <div>
                <p style={{ color: "cyan", fontSize: 72 }}>Inline Style 1</p>
                <p style={styles}>Inline Style 2</p>
            </div>
        );
    }
}
//Magic 8 Ball
class MagicEightBall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            randomIndex: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.ask = this.ask.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    ask() {
        if (this.state.value < 9 && this.state.value > -1) {
            this.setState({
                value: "",
                randomIndex: Math.floor(Math.random() * 20)
            })
        };
    }
    render() {
        const possibleAnswers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Most likely",
            "Outlook not so good",
            "Very doubtful"
        ];
        const answer = possibleAnswers[parseInt(this.state.randomIndex)];
        return (
            <div>
                <GetBallValue val={this.state.value} handleChange={this.handleChange} />
                <ShowBall message={answer} val={this.state.value} ask={this.ask} />
            </div>
        );
    }
}
class GetBallValue extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4><u>Enter 8 ball value: </u></h4>
                <input value={this.props.val} placeholder="1-8" onChange={this.props.handleChange} />
            </div>
        );
    }
}
class ShowBall extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.val < 9 && nextProps.val > -1) {
            console.log("Update!");
            return true;
        } else {
            console.log("No update!");
            return false;
        }
    }
    render() {
        return (
            <div>
                <button className="btn btn-default btn-primary" onClick={this.props.ask}>Ask The Magic 8 Ball!!</button>
                <h3>{this.props.message}</h3>
            </div>
        );
    }
}
//Using && for concise conditionals
class AndAnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }
    toggleDisplay() {
        if (this.state.display) {
            this.setState({
                display: false
            });
        } else {
            this.setState({
                display: true
            });
        }
    }
    render() {
        return (
            <div>
                <button className="btn btn-default btn-primary" onClick={this.toggleDisplay}>Click to Toggle!</button>
                {this.state.display == true && <h2>Now You See Me!</h2>}
                {this.state.display == false && <h2>Now You Do Not!</h2>}
            </div>
        );
    }
}
//Using ternary expressions for condition rendering
class CheckUserAge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAge: "",
            input: ""
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.enter = this.enter.bind(this);
        this.exit = this.exit.bind(this);
    }
    submit() {
        this.setState({
            userAge: this.state.input
        });
    }
    handleChange(event) {
        this.setState({
            input: event.target.value,
            userAge: ""
        });
    }
    enter() {
        alert("Hello User!!");
    }
    exit() {
        alert("Error! Too Young!!");
    }
    render() {
        const buttonOne = <button className="btn btn-default btn-primary" onClick={this.submit}>Submit</button>;
        const buttonTwo = <button className="btn btn-default btn-success" onClick={this.enter}>You may enter!</button>;
        const buttonThree = <button className="btn btn-default btn-danger" onClick={this.exit}>You may not pass!</button>
        return (
            <div>
                <input value={this.state.input} placeholder="Enter Age!" type="number" onChange={this.handleChange} />
                {
                    (this.state.userAge >= 18) ? buttonTwo : (this.state.userAge == "") ? buttonOne : buttonThree
                }
            </div>
        );
    }
}
//Render conditionally from props
class Result extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.fiftyFifty}</h1>
            </div>
        );
    }
}
class GameOfChance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 0,
            expression: null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            turn: this.state.turn + 1,
            expression: Math.random() > 0.5
        });
    }
    render() {
        return (
            <div>
                <button className="btn btn-default btn-primary" onClick={this.handleClick}>PLAY</button>
                {
                    (this.state.expression == null) ? <Result fiftyFifty="Click to Play!" /> : (this.state.expression == 1) ? <Result fiftyFifty="You Win!" /> : <Result fiftyFifty="You Lose!" />
                }
                <h5>Turn : {this.state.turn}</h5>
            </div>
        );
    }
}
//Conditionally change inline CSS based on component state
class GateKeeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    render() {
        var inputStyle = {
            border: "1px solid black"
        };
        if (this.state.input.length > 15) {
            inputStyle = {
                border: "5px solid red"
            };
        }
        return (
            <div>
                <input value={this.state.input} placeholder="Enter..(15 characters)" style={inputStyle} onChange={this.handleChange} />
            </div>
        );
    }
}
//Dynamically rendering elements using Arrays.map()
class MyToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            toDoList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            userInput: event.target.value
        });
    }
    handleSubmit() {
        var itemsList = this.state.userInput.split(",");
        this.setState({
            userInput: "",
            toDoList: itemsList
        });
    }
    render() {
        //All sibling child elements created by a mapping operation like this do need to be supplied with a unique key attribute
        var items = this.state.toDoList.map((item, index) => {
            return (
                <li key={index}>
                    {item}
                </li>
            );
        });
        const textAreaStyles = {
            width: 235,
            margin: 5
        };
        return (
            <div>
                <textarea value={this.state.userInput} placeholder="Enter comma separated items..." style={textAreaStyles} onChange={this.handleChange} />
                <br />
                <button className="btn btn-default btn-success" onClick={this.handleSubmit}>Generate</button>
                <h4><u>My To-Do List</u></h4>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}
//Dynamically filter an array using Array.filter()
class UsersOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'Jeff',
                    online: true
                },
                {
                    username: 'Alan',
                    online: false
                },
                {
                    username: 'Mary',
                    online: true
                },
                {
                    username: 'Jim',
                    online: false
                },
                {
                    username: 'Sara',
                    online: true
                },
                {
                    username: 'Laura',
                    online: true
                }
            ]
        }
    }
    render() {
        var usersOnline = this.state.users.filter((user) => user.online == true);
        var renderOnline = usersOnline.map((user, index) => {
            return (
                <li key={index + 1}>
                    {user.username}
                </li>
            );
        });
        return (
            <div>
                <h3><ul>Online:</ul></h3>
                <ul>
                    {renderOnline}
                </ul>
            </div>
        );
    }
}
//To render react on the server
//ReactDOMServer.renderToString(<UsersOnline />);

//Syntax for both ES6 class components and functional components, ReactDOM.render(<ComponentToRender />, targetNode)
ReactDOM.render(
    <div>
        {JSX}
        {JSX_1}
        <MyComponent_1 />
        <MyComponent_2 />
        <ParentComponent />
        <SuperParent />
        <Calender />
        <ToDo />
        <DisplayScore />
        <ShoppingCart />
        <ResetPassword />
        <StatefulComponent />
        <SetTheState />
        <ToggleState />
        <SimpleCounter />
        <ControlledInput />
        <ControlledForm />
        <Display />
        <LifeCycles />
        <Styles />
        <MagicEightBall />
        <AndAnd />
        <CheckUserAge />
        <GameOfChance />
        <GateKeeper />
        <MyToDoList />
        <UsersOnline />
    </div>,
    document.getElementById("root"));
