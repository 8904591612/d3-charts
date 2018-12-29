
 


var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select("body").append("svg").style("width","1800").style("height","1000").append("g").attr("transform","translate(500,60)");

var x = d3.scale.ordinal().rangeRoundBands([0, 1000],0.5);



var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
x.domain(["2016","2017","2018","January","February","March","April","May","June","July","August","September","October","November","December"])

var month_array=["January","February","March","April","May","June","July","August","September","October","November","December"]

  

d3.csv("sample_testing.csv",function(error,csv_data) {
	var nested_data = d3.nest()
                	.key(function(d)  { return d.Year; })
			.rollup(function(d){ return d3.mean(d,function(g){ return g.Rejection_percentage_in_tonnes}) })
                	.entries(csv_data)
	max_value = d3.max(nested_data.map(function(d){return d.values;})) ;
	min_value = d3.min(nested_data.map(function(d){return d.values;})) ;
	   
	var y = d3.scale.linear().range([height, min_value])
	
	var yAxis = d3.svg.axis()
    			.scale(y)
    			.orient("left").ticks(5)
	var last_data=[]

	csv_data.forEach(function(d) {
		
        	if(d["Year"] =="2018"){
			var monthly={};
			if(d["Plan_in_percent"]>max_value ){
				monthly["Plan_in_percent"] = max_value
			}else if(d["Plan_in_percent"]<min_value){
				monthly["Plan_in_percent"] = min_value
			}else{
				 monthly["Plan_in_percent"]=d["Plan_in_percent"];
			     }
			
			monthly["Rejection_percentage_in_tonnes"]=d["Rejection_percentage_in_tonnes"];
                       
			//console.log(parseInt(d["Month"]))
			monthly["month"]=month_array[parseInt(d["Month"])-1]
			last_data.push(monthly)

		}
    	});
	//console.log(last_data)
	//x.domain(nested_data.map(function(d) { return d.key; }));
	
  	//x.domain(csv_data.map(function(d) { return d.Year; }));
       
	
        y.domain([min_value-1,max_value+2])
	svg.append("g")
        	.attr("class", "x axis")
      		.attr("transform", "translate(0," + height + ")")
		
      		.call(xAxis)
    		.selectAll("text")
      		.style("text-anchor", "end")
		
      		.attr("dx", "-1.8em")
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
		.style("font-size","15")
      		.text("(Rejection percentage)");
	
  	svg.selectAll("bar")
      		.data(nested_data)
    		.enter().append("rect")
      		.style("fill", "steelblue")
      		.attr("x", function(d) { return x(d.key); })
      		.attr("width", x.rangeBand())
      		.attr("y", function(d) { return y(d.values); })
      		.attr("height", function(d) { return height - y(d.values); })
	

	var line = d3.svg.line()
   			.x(function(d) { return x(d.month)})
   			.y(function(d) { return y(d.Plan_in_percent)})
	/*var line = d3.svg.line()
			
			.x(function(d) { 
				
				console.log(d["month"])
				return d["month"]; 
			})
			.y(function(d) { 
				console.log(d["Rejection_percentage_in_tonnes"])
				return (d["Rejection_percentage_in_tonnes"]); 
			})
	svg.append("path").attr("d", line(last_data));*/
	var line2 = d3.svg.line()
   			.x(function(d) { return x(d.month)})
   			.y(function(d) { return y(d.Rejection_percentage_in_tonnes)})
        
	svg.append("path")
		.datum(last_data)
		.attr("fill", "none")
		.attr("stroke", function(d){ if(d.Rejection_percentage_in_tonnes>d.Plan_in_percent){ 
                                                   return "red";


						}else{  return "green" ; }  })


         
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line);
	
 	svg.append("path")
		.datum(last_data)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line2);
		
      });
	
   

  



