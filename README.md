# A dead simple D3.js web app template

### To get started:

1. Clone the repo:
  `git clone git@github.com:chriscanipe/dead-simple-d3.git scatterplot-example`

2. Start a Python simple server:
  `python3 -m http.server`
  *or*
  `python -m SimpleHTTPServer` if using an old version of Python

3. Go to `http://localhost:8000` in your browser




### D3 Basics


### Quick reference

- [What is SVG?](#whatissvg)
- [Making selections](#makingselections)
- [Scales](#scales)
- [The Margins convention](#themarginsconvention)
- [Axis](#axis)
<!-- - [datacalls](#datacalls)
- [Enter/Update](#enterupdate) -->

### What is SVG?
Stands for Scalable Vector Graphics
SVG contains a family of elements (html tags) that can only be used inside of a `<svg></svg>` element

Some common svg elements:
`<g>` Group tag
`<circle>` Circle
`<rect>` Rectange
`<path>` Path (a point-to-point representation of a shape)

Read more about each element and their properties [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes).

### Making selections
There are two ways to select elements in D3.js

`d3.select()`
Selects a single element by tag, class or ID. If more than one exists, `d3.select()` will select the first instance only.

`d3.selectAll("circle")`
Selects ALL elements by tag, class.

Selections allow you to append new elements to the DOM and to add and manipulate their attributes.

```
d3.select("div.chart")
  .append("svg")
  .attr("width", 800)
  .attr("height", 500);     
```

Selections can be defined as variables. Selections defined as variables can select other elements that exist inside of them.

```
  let svg = d3.select("svg")

  svg.selectAll("rect")
    .attr("fill", "orange");
```

Event listeners can be added to selections.

```
  d3.selectAll("circle")
    .on("click", (d,i,e)=> {
      d3.select(e[i]).classed("active", true);
      //e[i] is the "circle" being clicked on.
    })
```

Read more about selections [here](https://website.education.wisc.edu/~swu28/d3t/concept.html).


### Data Types

#### Arrays

A JavaScript array is a list of things. We use brackets `[]` to indicate an array, and each value is separated by commas.

For example: `["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]`

The planet names are each strings (text), so they're wrapped in quotes. Numbers don't need quotes.

#### Objects

A JavaScript object is basically a single thing with properties. You can think of it as a specific row in a spreadsheet with multiple columns. For example, in this table of planet statistics:

| name    | day_hours | mean_temp | moons |
|---------|-----------|-----------|-------|
| Mercury | 4222.6    | 332.6     | 0     |
| Venus   | 2802      | 867.2     | 0     |
| Earth   | 24        | 59        | 1     |
| Mars    | 24.7      | -85       | 2     |`

Earth has 4 properties: name, day_hours, mean_temp and moons.

In JavaScript, we would repesent Earth as an object:

`{
  name : "Earth",
  day_hours : 24,
  mean_temp : 59,
  moons : 1
}`

#### Object Arrays

The most common way to repesent a dataset is as an Object Array, which is basically just a list of things with properties. Again, the simplest allegory is that of a spreadsheet. Using the same table, we'd express the first four planets from the Sun as the following Object Array:

`[{
    "planet": "Mercury",
    "day_hours": 4222.6,
    "mean_temp": 332.6,
    "moons": 0
}, {
    "planet": "Venus",
    "day_hours": 2802,
    "mean_temp": 867.2,
    "moons": 0
}, {
    "planet": "Earth",
    "day_hours": 24,
    "mean_temp": 59,
    "moons": 1
}, {
    "planet": "Mars",
    "day_hours": 24.7,
    "mean_temp": -85,
    "moons": 2
}]`


### Scales

Scale functions are essentially algabraic formulas that convert a data point into a pixel value.

Example:
```
    let xScale = d3.scaleLinear() //This is a linear scale
        .rangeRound([0, width]) //Its "range" is the width of `this.plot`
        .domain([0, 1000]); //Its "domain" is 0 to 1000

    let yScale = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, 10000]);
```
Some common scale types:
`scaleLinear` Linear numerical scale. Ex: plotting values from 0 to 1000.
`scaleTime` Time scale. Ex: Plotting dates between 1950 and 2019.
`scaleBand` Categorical. Ex: Plotting a bar chart value for every U.S. state.

Read more about scales [here](https://d3indepth.com/scales/).


### The margins convention

When we chart a dataset, we're adding elements to a designated space (or "plot") on our page. That space has an available width and height in which those elements can appear (usually defined as the "range" or "rangeRound" property in our scales). Margins allow us to position the plot relative to the width and height of our SVG.

Read more about the margins convention [here](https://bl.ocks.org/mbostock/3019563).


### Axes

Drawing all of the ticks for axes would be hard if we had to do it manually, so D3 includes some very handy convenience methods. Scales are "called" inside of group (`<g></g>`) tags. Axes can be drawn on the top, left, right or bottom of a chart. 

``` 
    //The xAxis and yAxis group tags will hold our xAxis elements
    xAxis = plot.append("g")
        .classed("axis x-axis", true);

    yAxis = plot.append("g")
        .classed("axis y-axis", true);

    //Then, we position the elements and call the axis methods inside of them
    xAxis
        .attr("transform", "translate(0," + (height + 20) + ")")
        .call(
            d3.axisBottom(xScale)
            .tickSize(-height - 20)
        );

    yAxis
        .attr("transform", `translate(-20,0)`)
        .call(
            d3.axisLeft(yScale)
            .tickSize(-width - 20)
        );
```

The`transform` and `tickSize` properties control the position of the axes group and the lenghts of the ticks.

Read more about axes [here](https://www.dashingd3js.com/d3js-axes).


<!-- ### Data Calls

http://learnjsdata.com/read_data.html -->
