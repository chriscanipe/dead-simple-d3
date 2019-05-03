//Global functions are declared outside of functions.
//Global means we can access them from anywhere in our script.
//These are all variables we have named ourselves

let chart = {};



//Here's where we call our data. Once we have it, we can do stuff with it in the "callback"
// d3.csv("data/data.csv", function(error, data) {
//     if (error) throw error;

//     //This is the callback.
//     //It's the stuff that happens once the data has been called.

//     init(data);
// })


init();


function init(data) {

    //This is called a ternary operator. It's a shorthand if/else statement.
    //If `data` exists, chart.data is equal to `data`. If it doesnt' exist, define it as null.
    chart.data = data ? data : null;

    //Append our elements to the page. This only happens on load.
    appendElements();

    //Update positions and styles for everything on the page
    //whenever we update the page (on re-size, for example).
    update();

    d3.select(window).on("resize", d => {
        update();
    });

}


function update() {
    setDimensions();
    setScales();
    updateElements();
}


function setDimensions() {

    //there are two main types of data elements in JavaScript:
    //1. Object {}
    //Objects are accessible by keys, example: margin.top where ".top" is the key value.
    //2. Array []
    //Arrays are lists ex: [1,2,3,4,5];
    //Arrays can contain objects [{foo: bar, color: "green"}, {hat: brown, "dog" : "fido"}]

    //This is an object
    chart.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 100
    };

    let targetWidth = document.querySelector(".chart").offsetWidth;
    let targetHeight= document.querySelector(".chart").offsetHeight;

    chart.width = targetWidth - chart.margin.left - chart.margin.right;
    chart.height = targetHeight - chart.margin.top - chart.margin.bottom;
}


function setScales() {

    //These d3.scaleLinear() elements are functions that exist in D3

    chart.xScale = d3.scaleLinear() //This is a linear scale
        .rangeRound([0, chart.width]) //Its "range" is the width of `this.plot`
        .domain([0, 100]); //Its "domain" defaults to 0 to 100.

    chart.yScale = d3.scaleLinear()
        .rangeRound([chart.height, 0])
        .domain([0, 100]);


}






function appendElements() {

    //SVG is the container.
    chart.svg = d3.select(".chart").append("svg");

    //The plot is where the charting action happens.
    chart.plot = chart.svg.append("g").attr("class", "chart-g");

    //The xAxis and yAxis group tags will hold our xAxis elements (ticks, etc.)
    chart.xAxis = chart.plot.append("g")
        .classed("axis x-axis", true);

    chart.yAxis = chart.plot.append("g")
        .classed("axis y-axis", true);

}




function updateElements() {

    //The this.svg will be the FULL width and height of the parent container (this.element)
    chart.svg.attr("width", chart.width + chart.margin.left + chart.margin.right);
    chart.svg.attr("height", chart.height + chart.margin.top + chart.margin.bottom);

    //this.plot is offset from the top and left of the this.svg
    chart.plot.attr("transform", `translate(${chart.margin.left},${chart.margin.top})`);

    //This is where the axis elements get drawn. The "transform" property positions them
    //And the the .call() method draws the axis within that tag.
    //Most of the logic is behind the scenes
    chart.xAxis.attr("transform", "translate(0," + (chart.height + 20) + ")")
        .call(
            d3.axisBottom(chart.xScale)
            .tickSize(-chart.height - 20)
        );

    chart.yAxis.attr("transform", `translate(-20,0)`)
        .call(
            d3.axisLeft(chart.yScale)
            .tickSize(-chart.width - 20)
        );

}

