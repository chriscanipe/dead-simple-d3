




function init() {

    d3.csv("data/data.csv", function(error, data) {
        if (error) throw error;

        console.log(data);

    })

}

init();
