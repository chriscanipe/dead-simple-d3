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


###  Table of contents

- [SVG](#SVG)
- [Selections](#selections)
- [Scales](#scales)
- [Margins](#margins)
- [Axis](#axis)
- [datacalls](#datacalls)
- [Enter/Update](#enterupdate)





python -m SimpleHTTPServer
python3 -m http.server

### SVG
Stands for Scalable Vector Graphics
SVG contains a family of elements (html tags) that can only be used inside of a `<svg></svg>` element
Some examples:
`<circle>`
`<rect>`
`<path>`

Read more about each element and their properties [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes).


### Selections
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

`scaleLinear`
`scaleTime`
`scaleBand`


### Margins

When we chart a dataset, we're adding elements to a designated space (or "plot") on our page. That space has an available width and height in which those elements can appear (usually defined as the "range" or "rangeRound" property in our scales). Margins allow us to position the plot relative to the width and height of our SVG.

Read more about the margins convention [here](https://bl.ocks.org/mbostock/3019563).



### Axes
axisLeft
axisTop
axisBototm
axisRight

