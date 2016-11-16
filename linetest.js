function linetest(){
  var margin= {top:20, right:20, left:20, bottom:20}
  var width = 1024-margin.left-margin.right;
  var height = 768-margin.top- margin.bottom;
  var ctrl = d3.select("body.content").append("svg").attr("width", width).attr("height", height);
  d3.csv("https://whirllllll.github.io/D3/cpi.csv", 
    function(data)
    {
      var ln = data.length;
      console.log(data);
      var maxy = d3.max(data, function(d){ return d.p; });
      var lines = d3.line().x(function(d,i){return i*(width/ln);}).y(function(d){return height-d.p*(height/maxy)});
      ctrl.append("path").attr("d", function(d){
        return "M0,"+height+"L"+width+","+height;
      }).attr("stroke", "black").attr("fill", "none");
      ctrl.append("path").attr("d", function(d){
        return "M0,0"+"L0,"+height;
      }).attr("stroke", "black").attr("fill", "none");
      ctrl.append("path").data([data]).attr("d", lines).attr("stroke", "red").attr("fill", "none");
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);  
      x.domain(d3.extent(data, function(d) { return d.month; }));
      y.domain([0, maxy]);
      ctrl.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        ctrl.append("g")
          .call(d3.axisLeft(y));
    }

  );
}