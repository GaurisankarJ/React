"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "./style.scss";

let request, json;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.ajaxGET = this.ajaxGET.bind(this);
        this.ajaxPOST = this.ajaxPOST.bind(this);
    }
    componentDidMount() {
    //Add document elements
    const anchor = d3.select("a").append("h5").text("Sankar");
    //Select a group of elements
    d3.selectAll("li").text("List Element");
    //Work with data
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    d3.select("ul").selectAll("li").data(dataset).enter().append("h6").text("H6");
    /*
    When enter() is combined with the data() method, it looks at the selected elements from the page and compares them to the number of data items in the set. If there are fewer elements than data items, it creates the missing elements.
    */
    //Work with dynamic data
    d3.select("ul").selectAll("li").data(dataset).enter().append("h6").text((d) => d + " USD");
    //Add inline styling to elements
    d3.select("ul").selectAll("li").data(dataset).enter().append("h6").text((d) => d + " USD").style("color", "blue");
    //Change styles based on data
    d3.select("ul").selectAll("li").data(dataset).enter().append("h6").text((d) => d + " USD").style("color", (d) => {
        if(d > 20) {
            return "red";
        } else {
            return "green"
        }
    });
    //Add classes 
    d3.select("a").attr("class", "anchor");
    //Update the height of an element dynamically
    d3.select("ul").selectAll("li").data(dataset).enter().append("div").attr("class", "bar").style("height", (d) => (10 * d + "px")).style("margin", "2px");
    //Scalable Vector Graphics
    const svg = d3.select("span").append("svg").attr("width", 500).attr("height", 120).style("background-color", "pink");
    //Create a bar for each data point in the set,add hover effect, add tooltip
    svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", (d, i) => {
        return i * 30;
    }).attr("y", (d, i) => {
        return 120 - d * 3;//In general, the relationship is y = h - m * d, where m is the constant that scales the data points.
    }).attr("width", 25).attr("height", 100).attr("class", "bar").append("title").text(d => d);
    //Add and style labels for elements
    svg.selectAll("text").data(dataset).enter().append("text").attr("x", (d, i) => {
        return i * 30;
    }).attr("y", (d, i) => {
        return 120 - d * 3 - 3;
    }).text(d => d).style("font-size", "20px").attr("fill", "red")
    //Display shapes with SVG, change the color of an SVG element
    svg.append("rect").attr("width", 100).attr("height", 50).attr("x", 300).attr("y", 25).attr("fill", "navy");
    //Create scatter plots with SVG circles
    const circleDataset = [
            [34, 78],
            [109, 280],
            [310, 120],
            [79, 411],
            [420, 220],
            [233, 145],
            [333, 96],
            [222, 333],
            [78, 320],
            [21, 123]
        ];
    const padding = 30;
    const scatterSVG = d3.select("article").append("svg").attr("width", 500).attr("height", 500);
    scatterSVG.selectAll("circle").data(circleDataset).enter().append("circle").attr("cx", d => (padding + d[0])).attr("cy", d => (500 - d[1] - padding)).attr("r", "5").attr("fill", "red");
    //Add labels to scatter plot circles
    scatterSVG.selectAll("text").data(circleDataset).enter().append("text").attr("x", d => (padding + 5 + d[0])).attr("y", d => (500 - d[1] - padding)).text(d => (d[0] + ", " + d[1]));
    //Create a linear scale, set a domain and range on a scale
    const scale = d3.scaleLinear();
    scale.domain([250, 500]).range([10, 150]);//This is the input information for a scale is domain, the output information is called range
    var output = scale(50);
    //Find the minimum and maximum values in a dataset
    const positionData = [[1, 7, -4],[6, 3, 8],[2, 8, 3]];
    var max = d3.max(positionData, d => d[2]);
    var min = d3.min(positionData, d => d[2]);
    //Use dynamic scales
    const w = 500;
    const h = 500;
    const xScale = d3.scaleLinear().domain([0, d3.max(circleDataset, d => d[0])]).range([0, w - padding]);
    const yScale = d3.scaleLinear().domain([0, d3.max(circleDataset, d => d[1])]).range([h - padding, padding]);
    d3.select("article").append("h1").text(output + ", " + max + ", " + min + ", " + Math.ceil(xScale(411)) + ", " + yScale(411));
    //Use predefined scales to place elements
    /*
    scatterSVG.selectAll("circle").data(circleDataset).enter().append("circle").attr("cx", d => xScale(d[0])).attr("cy", d => yScale(d[1])).attr("r", "5").attr("fill", "red");
    scatterSVG.selectAll("text").data(circleDataset).enter().append("text").attr("x", d => xScale(5 + d[0])).attr("y", d => yScale(d[1])).text(d => (d[0] + ", " + d[1]));
    */
    //Add axes to a visualization
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    scatterSVG.append("g").attr("transform", "translate(30, " + (h - padding) + ")").call(xAxis);
    scatterSVG.append("g").attr("transform", "translate(" + padding + ", 0)").call(yAxis);

    //Ajax and API's 
    //https://reactjs.org/docs/faq-ajax.html
    /*
    For JavaScript,
    document.addEventListener("DOMContentLoaded", this.ajaxGET);
    document.addEventListener("DOMContentLoaded", this.ajaxPOST);
    */
   //Fetching data in React
    fetch("http://localhost:3000/data").then(res => res.json()).then((result) => {
            this.setState({
                isLoaded: true,
                items: result
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    );
    }
    ajaxGET() {
        console.log(this.state);
        /*
        //Change text by class name
        document.getElementsByClassName("message")[0].textContent = "Change text by class name!!";
        //Get JSON with the JavaScript XMLHttpRequest method
        request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/db", true);
        request.send();
        request.onload = function () {
            json = JSON.parse(request.responseText);
            document.getElementsByClassName("message")[0].innerHTML = JSON.stringify(json);
        };
        */
        request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/data", true);
        request.send();
        request.onload = function() {
            json = JSON.parse(request.responseText);
            //console.log(JSON.stringify(json));
            var html = "";
            //To prefilter JSON
            json = json.filter((val) => {
                return (val.id !== 1);
            });
            json.forEach((val) => {
                var keys = Object.keys(val);
                html += "<div className = 'cat'>";
                keys.forEach((key) => {
                    html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
                });
            //Render images from data sources
            html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";
            html += "</div><br>";
            });
            document.getElementsByClassName("message")[0].innerHTML = html;
        }
        //To get geolocation data 
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                document.getElementById("data").innerHTML="<strong>Latitude:</strong> "+ position.coords.latitude + "<br><strong>Longitude:</strong> " + position.coords.longitude;
            });
        }
    }
    ajaxPOST() {
        var userName = document.getElementById("name").value;
        var url = "http://localhost:3000/data";
        request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type","text/plain");
        request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200) {
                document.getElementsByClassName("message")[0].innerHTML = request.responseText;
            }
        };
        request.send(userName);
    }
    render() {
        return (
            <div id="body">
                <header>
                    <h2>D3 - Data Driven Documents</h2>
                </header>
                <div id="playground">
                    <a href="https://github.com/GaurisankarJ/"></a>
                    <ul>
                        <li>Example</li>
                        <li>Example</li>
                        <li>Example</li>
                    </ul>
                    <span>
                    </span>
                    <article>
                    </article>
                    <div className="message box">
                        The message will go here
                    </div>
                    <div id="data" className="box">
                        Location
                    </div>
                    <button id="getMessage" className="btn btn-default btn-primary" onClick={this.ajaxGET}>Get Message</button>
                    <br />
                    <label htmlFor="name">
                        <input type="text" id="name" placeholder="Your name..." />
                    </label>
                    <br />
                    <button id="sendMessage" className="btn btn-default btn-primary" onClick={this.ajaxPOST}>Send Message</button>
                </div>
                <footer>
                    <h5>&copy; Started on <time dateTime="2018-11-21">21<sup>st</sup>November, 2018</time></h5>
                </footer>
            </div>
        );
        
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);