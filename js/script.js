




function saySomething(something, somethingElse) {

  console.log(something);

  console.log(somethingElse);

}



function init() {

    d3.json("data/data.json", function(error, data) {
        
      loopThroughOurData(data);

    })


    d3.select(".chart").select("p").html("Hello again.");

    d3.selectAll("p").html("Change all the paragraph tags")
    

}


saySomething("Hello", "World!");



function loopThroughOurData(ourData) {

  ourData.forEach(d=> {

    d3.select(".chart")
      .append("p")
      .html(d.full_name);

  })

}



//Calls a function
init();
