"use strict";
import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

let request, json;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null
        }
        this.handleD3 = this.handleD3.bind(this);
    }
    handleD3() {
        let yMargin = 40,
            width = 800,
            height = 400,
            barWidth = width / 275;
        var tooltip = d3.select(".visHolder")
            .append("div")
            .attr("id", "tooltip")
            .style("opacity", 0);
        var overlay = d3.select(".visHolder")
            .append("div")
            .attr("class", "overlay")
            .style("opacity", 0);
        var svgContainer = d3.select(".visHolder")
            .append("svg")
            .attr("width", width + 100)
            .attr("height", height + 60);
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -200)
            .attr("y", 80)
            .text("Gross Domestic Product");
        svgContainer.append("text")
            .attr('x', width / 2 + 120)
            .attr('y', height + 50)
            .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
            .attr('class', 'info');
        var years = this.state.data.data.map((element) => {
            var quarter = "";
            var temp = element[0].substring(5, 7);
            switch(temp) {
                case "01":
                    quarter = "Q1";
                    break;
                case "04":
                    quarter = "Q2";
                    break;
                case "07":
                    quarter = "Q3";
                    break;
                case "10":
                    quarter = "Q4";
                    break;
                default:
                    break;
            }
            return element[0].substring(0, 4) + " " + quarter;
        });
        var yearsDate = this.state.data.data.map((elements) => {
            return new Date(elements[0]);
        });
        console.log(yearsDate)
    }
    componentDidMount() {
        fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
            .then(response => response.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    data: result
                });
                this.handleD3();
                }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
    render() {
        return (
            <div className="container">
                <div id="title">United States GDP</div>
                <div className="visHolder"></div>
            </div>
        );
        
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);