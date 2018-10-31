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
    </div>, 
    document.getElementById("root"));
