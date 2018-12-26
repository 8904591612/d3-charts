
 


var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select("body").append("svg").style("width","1500").style("height","1000").append("g").attr("transform","translate(200,20)");

var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);



var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    


  

d3.csv("sample_testing.csv",function(error,csv_data) {
	var nested_data = d3.nest()
                	.key(function(d)  { return d.Year; })
			.rollup(function(d){ return d3.mean(d,function(g){ return g.Rejection_percentage_in_tonnes}) })
                	.entries(csv_data)
	max_value = d3.max(nested_data.map(function(d){return d.values;})) ;
	min_value = d3.min(nested_data.map(function(d){return d.values;})) ;
	console.log(nested_data)
	
    
	var y = d3.scale.linear().range([height, min_value])
	console.log(y)
	var yAxis = d3.svg.axis()
    			.scale(y)
    			.orient("left");
	
	

	x.domain(nested_data.map(function(d) { return d.key; }));
  	
       
	
        y.domain([min_value,max_value]);
	svg.append("g")
        	.attr("class", "x axis")
      		.attr("transform", "translate(0," + height + ")")
		
      		.call(xAxis)
    		.selectAll("text")
      		.style("text-anchor", "end")
		
      		.attr("dx", "-.8em")
      		.attr("dy", "-.55em")
      		.attr("transform", "rotate(-90)" );

  	svg.append("g")
        	.attr("class", "y axis")
      		.call(yAxis)
    		.append("text")
      		.attr("transform", "rotate(-90)")
      		.attr("y", 10)
      		.attr("dy", ".71em")
      		.style("text-anchor", "end")
      		.text("(Rejection percentage)");
	
  	svg.selectAll("bar")
      		.data(nested_data)
    		.enter().append("rect")
      		.style("fill", "steelblue")
      		.attr("x", function(d) { return x(d.key); })
      		.attr("width", x.rangeBand())
      		.attr("y", function(d) { return y(d.values); })
      		.attr("height", function(d) { return height - y(d.values); })
		
      });
	
   
//})
  


/*	
var x =d3.scale.linear().range([0,1000])
x.domain([0,200]);


var y =d3.scale.linear().range([500,0])
y.domain([0, 10000]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("body").append("svg").style("width","1500").style("height","1000").append("g").attr("transform","translate(200,20)");
    	

	


   
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,300)")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 25)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

    


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

    */
