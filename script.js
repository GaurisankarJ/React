"use strict";

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
var MyComponent_1 = function() {
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
                <ParentComponent/>
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
SetScore.defaultProps = { score: 100, name: "God"}
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
        return(
            <div>
                <h3>The name is {this.state.name}.</h3>
                <h4>You can call me {nickname}.</h4>
            </div>
        );
    }
}
//*********************************************************************************************************************
//To set the state
class SetTheState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theState: "Initial State",
            countState: 0
        };
        this.handleClick = this.handleClick.bind(this);{/*Binding this to a class method*/}
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
        if(this.state.visibility) {
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
        if(this.state.visibility) {
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
                <button className="btn btn-default button-success" onClick={this.increment}>Increment</button>
                <button className="btn btn-default button-danger" onClick={this.decrement}>Decrement</button>
                <button className="btn btn-default button-primary" onClick={this.reset}>Reset</button>
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
                <input value={this.state.value} placeholder="Enter Input" onChange={this.handleChange} />
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
        event.preventDefault();{/*To prevent the default form submit behavior which will refresh the web page*/}
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
                    <button className="btn btn-default button-primary" type="submit">Submit</button>
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
                <input value={this.props.input} placeholder="Number..." onChange={this.props.handleChange} />
            </div>
        );
    }
}
class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "CR",
            numb: 7
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            numb: event.target.value
        });
    }
    render() {
        return (
            <div>
                <DisplayString text={this.state.text} />
                <DisplayNumber numb={this.state.numb} />
                <GetNumber input={this.state.numb} handleChange={this.handleChange} />
            </div>
        );
    }
}
//Using lifecycle methods
//componentWillMount(), componentDidMount()
//The componentWillMount() method is called before the render() method when a component is being mounted to the DOM
//The componentDidMount() method is called after a component is mounted to the DOM, the best practice with React is to place API calls or any calls to your server in this lifecycle method 
class LifeCycles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: 0
        }
    }
    componentWillMount() {
        console.log("componentWillMount()");
    }
    componentDidMount() {
    //Mock API call, sets state after 2.5 seconds to simulate calling a server to retrieve data
    setTimeout( () => {
        this.setState({
            users: 1273
            });
        }, 2500);
    }
    render() {
        return (
            <div>
                <h5>componentWillMount()</h5>
                <h5>componentDidMount()</h5>
                <h6>USERS : {this.state.users}</h6>
            </div>
        );
    }
}
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
    <ResetPassword />
    <StatefulComponent />
    <SetTheState />
    <ToggleState />
    <SimpleCounter />
    <ControlledInput />
    <ControlledForm />
    <Display />
    </div>, 
    document.getElementById("root"));
