/* global d3 */
function drawGauge(opt) {
    // Set defaults if not supplied
    if(typeof opt === 'undefined')                      {var opt={}}
    if(typeof opt.gaugeRadius === 'undefined')          {opt.gaugeRadius=200}
    if(typeof opt.offsetX === 'undefined')              {opt.offsetX=0}
    if(typeof opt.offsetY === 'undefined')              {opt.offsetY=0}
    if(typeof opt.minVal === 'undefined')               {opt.minVal=0}
    if(typeof opt.maxVal === 'undefined')               {opt.maxVal=100}
    if(typeof opt.tickSpaceMinVal === 'undefined')      {opt.tickSpaceMinVal=1}
    if(typeof opt.tickSpaceMajVal === 'undefined')      {opt.tickSpaceMajVal=10}
    if(typeof opt.divID === 'undefined')                {opt.divID="vizBox"}
    if(typeof opt.needleVal === 'undefined')            {opt.needleVal=60}
    if(typeof opt.gaugeUnits === 'undefined')           {opt.gaugeUnits="%"}
    if(typeof opt.showTickUnits === 'undefined')        {opt.showTickUnits = false}
    if(typeof opt.outerTicks === 'undefined')           {opt.outerTicks = false} //in which direction major ticks outgrow minor ticks
    if(typeof opt.gaugeLink === 'undefined')            {opt.gaugeLink=""}
    
    if(typeof opt.padding === 'undefined')              {opt.padding=0.05}
    if(typeof opt.edgeWidth === 'undefined')            {opt.edgeWidth=0.05}
    if(typeof opt.tickEdgeGap === 'undefined')          {opt.tickEdgeGap=0.05}
    if(typeof opt.tickLengthMaj === 'undefined')        {opt.tickLengthMaj=0.15}
    if(typeof opt.tickLengthMin === 'undefined')        {opt.tickLengthMin=0.05}
    if(typeof opt.needleTickGap === 'undefined')        {opt.needleTickGap=0.05}
    if(typeof opt.needleLengthNeg === 'undefined')      {opt.needleLengthNeg=0.2}
    if(typeof opt.pivotRadius === 'undefined')          {opt.pivotRadius=0.1}

    if(typeof opt.ticknessGaugeBasis === 'undefined')   {opt.ticknessGaugeBasis=200}
    if(typeof opt.needleWidth === 'undefined')          {opt.needleWidth=5}
    if(typeof opt.tickWidthMaj === 'undefined')         {opt.tickWidthMaj=3}
    if(typeof opt.tickWidthMin === 'undefined')         {opt.tickWidthMin=1}
    
    if(typeof opt.labelFontSize === 'undefined')        {opt.labelFontSize=18}
    if(typeof opt.labelPadding === 'undefined')         {opt.labelPadding=opt.labelFontSize}
    if(typeof opt.unitsFontSize === 'undefined')        {opt.unitsFontSize=opt.labelFontSize}
    if(typeof opt.labelFontWeight === 'undefined')      {opt.labelFontWeight="bold"}
    if(typeof opt.unitsFontWeight === 'undefined')      {opt.unitsFontWeight=opt.labelFontWeight}
    if(typeof opt.titleOffsetX === 'undefined')         {opt.titleOffsetX=0}
    if(typeof opt.titleOffsetY === 'undefined')         {opt.titleOffsetY=0}
    if(typeof opt.titleFontSize === 'undefined')        {opt.titleFontSize=opt.labelFontSize}
    if(typeof opt.titleTextAnchor === 'undefined')      {opt.titleTextAnchor="middle"}
    if(typeof opt.titleFontWeight === 'undefined')      {opt.titleFontWeight="bold"}
    if(typeof opt.titleFontFamily === 'undefined')      {opt.titleFontFamily="Play"}
    if(typeof opt.titleText === 'undefined')            {opt.titleText=""}
    if(typeof opt.dropShadowBlur === 'undefined')       {opt.dropShadowBlur=5}
    if(typeof opt.dropShadowHeight === 'undefined')     {opt.dropShadowHeight="130%"}
    if(typeof opt.dropShadowDistanceX === 'undefined')  {opt.dropShadowDistanceX=5}
    if(typeof opt.dropShadowDistanceY === 'undefined')  {opt.dropShadowDistanceY=5}
    

    if(typeof opt.zeroTickAngle === 'undefined')        {opt.zeroTickAngle=60}
    if(typeof opt.maxTickAngle === 'undefined')         {opt.maxTickAngle=300}
    if(typeof opt.zeroNeedleAngle === 'undefined')      {opt.zeroNeedleAngle=40}
    if(typeof opt.maxNeedleAngle === 'undefined')       {opt.maxNeedleAngle=320}
    if(typeof opt.animDuration === 'undefined')         {opt.animDuration=1000}

    if(typeof opt.tickColMaj === 'undefined')           {opt.tickColMaj = '#0099CC'}
    if(typeof opt.tickColMin === 'undefined')           {opt.tickColMin = '#000'}
    if(typeof opt.outerEdgeCol === 'undefined')         {opt.outerEdgeCol = '#0099CC'}
    if(typeof opt.pivotCol === 'undefined')             {opt.pivotCol = '#999'}
    if(typeof opt.innerCol === 'undefined')             {opt.innerCol = '#fff'}
    if(typeof opt.unitsLabelCol === 'undefined')        {opt.unitsLabelCol = '#000'}
    if(typeof opt.tickLabelCol === 'undefined')         {opt.tickLabelCol = '#000'}
    if(typeof opt.needleCol === 'undefined')            {opt.needleCol = '#0099CC'}
    if(typeof opt.titleCol === 'undefined')             {opt.titleCol="#000"}

    var defaultFonts = '"Helvetica Neue", Helvetica, Arial, sans-serif'
    if(typeof opt.tickFont === 'undefined')             {opt.tickFont = defaultFonts};
    if(typeof opt.unitsFont === 'undefined')            {opt.unitsFont = defaultFonts};

    if(typeof opt.colRanges === 'undefined')            {opt.colRanges = {};};

    // checking parameter orders and chnage them, if necessary
    if (opt.labelFontSize < 6) { opt.labelFontSize = 0 };
    if (opt.minVal > opt.maxVal) [opt.minVal, opt.maxVal] = [opt.maxVal, opt.minVal];
    if (opt.zeroTickAngle > opt.maxTickAngle) [opt.zeroTickAngle, opt.maxTickAngle] = [opt.maxTickAngle, opt.zeroTickAngle];
    if (opt.zeroNeedAngle > opt.maxNeedAngle) [opt.zeroNeedAngle, opt.maxNeedAngle] = [opt.maxNeedAngle, opt.zeroNeedAngle];

    // Calculate absolute values
    opt.padding = opt.padding * opt.gaugeRadius,
    opt.edgeWidth = opt.edgeWidth * opt.gaugeRadius,
    opt.tickEdgeGap = opt.tickEdgeGap * opt.gaugeRadius,
    opt.tickLengthMaj = opt.tickLengthMaj * opt.gaugeRadius,
    opt.tickLengthMin = opt.tickLengthMin * opt.gaugeRadius,
    opt.needleTickGap = opt.needleTickGap * opt.gaugeRadius,
    opt.needleLengthNeg = opt.needleLengthNeg * opt.gaugeRadius,
    opt.pivotRadius = opt.pivotRadius * opt.gaugeRadius;

    var ticknessRatio = (opt.gaugeRadius / opt.ticknessGaugeBasis);
    opt.needleWidth = opt.needleWidth * ticknessRatio,
    opt.tickWidthMaj = opt.tickWidthMaj * ticknessRatio,
    opt.tickWidthMin = opt.tickWidthMin * ticknessRatio,
    opt.labelFontSize = opt.labelFontSize * ticknessRatio;

        
    //Define a linear scale to convert values to needle displacement angle (degrees)
    var valueScale = d3.scaleLinear()
            .domain([opt.minVal, opt.maxVal])
            .range([opt.zeroTickAngle, opt.maxTickAngle]);
    
    //Calculate tick mark angles (degrees)
    var counter = 0,
        tickAnglesMaj = [],
        tickAnglesMin = [],
        tickSpacingMajDeg = valueScale(opt.tickSpaceMajVal) - valueScale(0),
        tickSpacingMinDeg = valueScale(opt.tickSpaceMinVal) - valueScale(0);
    
    for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg)
        { 
            tickAnglesMaj.push(opt.zeroTickAngle + (tickSpacingMajDeg * counter))
            counter++
        }
    
    counter = 0
    for (var i=opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMinDeg)
        { 
        //Check for an existing major tick angle
        var exists = false;
            tickAnglesMaj.forEach(function(d){
                exists = (opt.zeroTickAngle + (tickSpacingMinDeg * counter)) == d
            })
            
            if (!exists) {tickAnglesMin.push(opt.zeroTickAngle + (tickSpacingMinDeg * counter))}
            counter++
        }

    
    //Calculate major tick mark label text
    counter=0
    var tickLabelText = []; 
    var maxLabelLength = 0, minLabelLength = 100; // these varaibles are used for adjusting lbel positions
    
    for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg)
    { 
        var tickVal = opt.minVal + (opt.tickSpaceMajVal * counter)
        // add the unit text if required
        if (opt.showTickUnits) tickVal = tickVal + opt.gaugeUnits;

        // calculate max ane min length of tick Labels
        if (maxLabelLength < tickVal.length) maxLabelLength = tickVal.length;
        if (minLabelLength > tickVal.length) minLabelLength = tickVal.length;
        
        tickLabelText.push(tickVal)
        counter++
    }    
  
    //Calculate required values
    var outerTickPadding = (opt.outerTicks ? opt.labelPadding : 0);
    var workRadius = opt.gaugeRadius - opt.padding - opt.edgeWidth;
    var hFont = opt.labelFontSize, wFont = opt.labelFontSize * maxLabelLength;
    var needleLengthPos = workRadius - opt.tickLengthMaj - opt.needleTickGap - outerTickPadding,
        needlePathLength = opt.needleLengthNeg + needleLengthPos,
        needlePathStart = opt.needleLengthNeg * (-1),
        outerTickStart = workRadius - opt.labelPadding - wFont,
        tickStartMaj = opt.outerTicks ? outerTickStart : workRadius - opt.tickLengthMaj - opt.tickEdgeGap,
        tickStartMin = opt.outerTicks ? outerTickStart : workRadius - opt.tickLengthMin - opt.tickEdgeGap,
        innerEdgeRadius = opt.gaugeRadius - opt.padding - opt.edgeWidth + outerTickPadding ,
        outerEdgeRadius = opt.gaugeRadius - opt.padding + outerTickPadding ;
    var labelStart = opt.outerTicks ? opt.gaugeRadius - opt.padding - opt.edgeWidth + opt.labelPadding : tickStartMaj - opt.tickLengthMaj - opt.labelPadding;
    var originX = opt.gaugeRadius + opt.offsetX + opt.dropShadowDistanceX;
    var originY = opt.gaugeRadius + opt.offsetY + opt.dropShadowDistanceY;

    //console.log("lab:" + labelStart + " maj:" + tickStartMaj + " min:" + tickStartMin)
    //Add the svg content holder to the visualisation box element in the document (vizbox)

    //calculate the container-box values based on the zero and maxTickAngle
    var zeroQuartal = 0, maxQuartal = 0

    if (opt.zeroTickAngle > 0 && opt.zeroTickAngle <= 90) zeroQuartal = 1
    else if (opt.zeroTickAngle > 90 && opt.zeroTickAngle <= 180) zeroQuartal = 2
    else if (opt.zeroTickAngle > 180 && opt.zeroTickAngle <= 270) zeroQuartal = 3
    else zeroQuartal = 4


    if (opt.maxTickAngle > 0 && opt.maxTickAngle <= 90) maxQuartal = 1
    else if (opt.maxTickAngle > 90 && opt.maxTickAngle <= 180) maxQuartal = 2
    else if (opt.maxTickAngle > 180 && opt.maxTickAngle <= 270) maxQuartal = 3
    else maxQuartal = 4


    var hZero = Math.cos(dToR(opt.zeroTickAngle)),
        hMax = Math.cos(dToR(opt.maxTickAngle)),
        wZero = Math.sin(dToR(opt.zeroTickAngle)),
        wMax = Math.sin(dToR(opt.maxTickAngle)),
        hFactor = 2, wFactor = 2; 

    switch (zeroQuartal) {
        case 1:
            switch (maxQuartal) {
                case 1: hFactor = max(hZero, hMax); wFactor = max(wZero, wMax); break
                case 2: hFactor = hZero - hMax; wFactor = 1; break
                case 3: hFactor = 1 + hZero; wFactor = 1 - wMax; break
                case 4: hFactor = 1 + max(hZero, hMax); wFactor = 2; wFont = 0; break
            }
            break
        case 2:
            switch (maxQuartal) {
                case 2: hFactor = max(-hZero, -hMax); wFactor = max(wZero, wMax); break
                case 3: hFactor = 1; wFactor = max(wZero, -wMax); break
                case 4: hFactor = 2; wFactor = max(-wZero, -wMax); break
            }
            break
        case 3:
            switch (maxQuartal) {
                case 3: hFactor = max(-hZero, -hMax); wFactor = max(-wZero, -wMax); break
                case 4: hFactor = max(hZero, -hMax); wFactor = max(-wZero, -wMax); break
            }
            break
        case 4:
            switch (maxQuartal) {
                case 4: hFactor = max(hZero, hMax); wFactor = max(-wZero, -wMax); break
            }
            break
    }

    var svgHeight = opt.gaugeRadius * hFactor+hFont;
    var svgWidth = opt.gaugeRadius * wFactor + 2 * wFont

    var boxId = "SVGbox-" + opt.divID;
    // set common variables for anchored and non-anchored gauges
    var shadowedWidth = svgWidth + opt.offsetX + (2 * (opt.dropShadowDistanceX + opt.dropShadowBlur)),
        shadowedHeight = svgHeight + opt.offsetY + (2 * (opt.dropShadowDistanceY + opt.dropShadowBlur));
    var xmlns_attr = { 'xmlns': 'http://www.w3.org/2000/svg', 'xmlns:xlink': 'http://www.w3.org/1999/xlink' };

    //console.log("shw:" + shadowedWidth + " shh:" + shadowedHeight);

    if (opt.gaugeLink != "") {
    // set width taking into account any potential drop shadow. Make sure to 0 out drop shadow for smaller padding
    // create a SVG with an anchor tag if gaugeLink is set.
    d3.select("#" + opt.divID)
        .append("a")
        .attr("href", opt.gaugeLink)
        .append("svg")
        .attr("id", boxId)
        .attr("width", shadowedWidth)
        .attr("height", shadowedHeight )
        .attr(xmlns_attr);
    } else {
    d3.select("#" + opt.divID)
        .append("svg")
        .attr("id", boxId)
        .attr("width", shadowedWidth)
        .attr("height", shadowedHeight)
        .attr(xmlns_attr);
    }
    
    var svg = d3.select("#SVGbox-" + opt.divID);

    //Draw the circles that make up the edge of the gauge
    var circleGroup = svg.append("g").attr("id", "circles");
    //outer circle
    circleGroup.append("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", outerEdgeRadius)
        .style("filter", "url(#drop-shadow-" + opt.divID + ")")
        .style("fill", opt.outerEdgeCol)
        .style("stroke", "solid");
    //inner circle
    circleGroup.append("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", innerEdgeRadius)
        .style("fill", opt.innerCol)
        .style("stroke", "none");    
    //Draw the circle for the needle 'pivot'
    circleGroup.append("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", opt.pivotRadius)
        .style("fill", opt.pivotCol)
        .style("stroke", "none");
    
    
    //Define two functions for calculating the coordinates of the major & minor tick mark paths
    tickCalcMaj = function() {  
        function pathCalc(d,i) {
            //Offset the tick mark angle so zero is vertically down, then convert to radians
            var tickAngle = d + 90,
                tickAngleRad = dToR(tickAngle);

            var y1 = originY + (tickStartMaj * Math.sin(tickAngleRad)),
                y2 = originY + ((tickStartMaj + opt.tickLengthMaj) * Math.sin(tickAngleRad)),
                x1 = originX + (tickStartMaj * Math.cos(tickAngleRad)),
                x2 = originX + ((tickStartMaj + opt.tickLengthMaj) * Math.cos(tickAngleRad)),
                
                lineData = [{"x": x1, "y": y1}, {"x": x2, "y": y2}];

            //Use a D3.JS path generator
            var lineFunc = d3.line()
                .x(d => d.x)
                .y(d => d.y);

            var lineSVG = lineFunc(lineData)

            return lineSVG
        }
        return pathCalc;
    };
    
    tickCalcMin = function() {  
        function pathCalc(d,i) {
            //Offset the tick mark angle so zero is vertically down, then convert to radians
            var tickAngle = d + 90,
                tickAngleRad = dToR(tickAngle);

            var y1 = originY + (tickStartMin * Math.sin(tickAngleRad)),
                y2 = originY + ((tickStartMin + opt.tickLengthMin) * Math.sin(tickAngleRad)),
                x1 = originX + (tickStartMin * Math.cos(tickAngleRad)),
                x2 = originX + ((tickStartMin + opt.tickLengthMin) * Math.cos(tickAngleRad)),
                
                lineData = [{"x": x1, "y": y1}, {"x": x2, "y": y2}];

            //Use a D3.JS path generator
            var lineFunc=d3.line()
                .x(d => d.x)
                .y(d => d.y);

            var lineSVG = lineFunc(lineData)

            return lineSVG
        }
        return pathCalc;
    };    
    
   var  pathTickMaj = tickCalcMaj();
   var  pathTickMin = tickCalcMin();

    
    //Add a group to hold the ticks
    var ticks = svg.append("g")
                .attr("id","tickMarks")
    
    //Add a groups for major and minor ticks (minor first, so majors overlay)
    var ticksMin = ticks.append("g")
                .attr("id","minorTickMarks")
    var ticksMaj = ticks.append("g")
                .attr("id","majorTickMarks")

    // keep track of the total tick count
    var majCount = 0;
    var minCount = 0;

    function getMajColorFromRange(value) {
      var thisColor = opt.tickColMaj;
      var highest_so_far = 0;
      for(var key in opt.colRanges) {
        var newColor = opt.colRanges[key];
        if ((majCount >= key) && (key >= highest_so_far)) { 
            thisColor = newColor;
            highest_so_far = key;
        }
      }
      return thisColor;
    }
    
    function getMinColorFromRange(value) {
      var thisColor = opt.tickColMin;
      var highest_so_far = 0;
      for(var key in opt.colRanges){
        var newColor = opt.colRanges[key];
        if (((minCount * opt.tickSpaceMinVal) + opt.minVal >= key) && (key >= highest_so_far)) {
            thisColor = newColor;
            highest_so_far = key;
        }
      }
      return thisColor;
    }
  
    //Draw the tick marks 
    ticksMin.selectAll("path")
        .data(tickAnglesMin)
        .enter().append("path")
        .attr("d", pathTickMin)
// if the count is greater than a configured level, change the color
        .style("stroke", function() {
            var res = getMinColorFromRange(minCount);
            minCount++;
            return res;
        })
        .style("stroke-width", opt.tickWidthMin+"px");    
    ticksMaj.selectAll("path")
        .data(tickAnglesMaj)
        .enter().append("path")
        .attr("d", pathTickMaj)
// if the count is greater than a configured level, change the color
        .style("stroke", function() {
            var res = getMajColorFromRange(majCount)
            majCount++;
            return res;
        })
        .style("stroke-width", opt.tickWidthMaj+"px");  

    
    //Define functions to calcuate the positions of the labels for the tick marks
    function labelXcalc(d,i){
        var tickAngle = d + 90;
        var tickAngleRad = dToR(tickAngle);
        var absXCorr = opt.labelFontSize * (tickLabelText[i].length - minLabelLength) / 2;
        var xCorr = opt.outerTicks ? absXCorr : - absXCorr;
        var x1 = originX + labelStart * Math.cos(tickAngleRad)+xCorr;
        return x1
    }
    function labelYcalc(d,i){
        var tickAngle = d + 90;
        var tickAngleRad = dToR(tickAngle);
        var sinAngle = Math.sin(tickAngleRad);
        var absYCorr = opt.labelFontSize * sinAngle;
        var yCorr = opt.outerTicks ? -absYCorr : opt.labelFontSize/2;
        var y1 = originY + labelStart * sinAngle + yCorr;        
        return y1
    }    
    
    //Add labels for major tick marks
    //console.log("outerTicks=" + opt.outerTicks);
    var tickLabels = svg.append("g")
                .attr("id", "tickLabels")
    tickLabels.selectAll("text")
        .data(tickAnglesMaj)
        .enter().append("text")
        .attr("x", (d,i) => labelXcalc(d,i)) 
        .attr("y", (d,i) => labelYcalc(d,i))    
        .attr("font-size", opt.labelFontSize) 
        .attr("text-anchor", "middle")
        .style("fill", opt.tickLabelCol)
        .style("font-weight", opt.labelFontWeight)
        .attr("font-family", opt.tickFont)
        .text((_d,i) => tickLabelText[i])
    
    //Add label for units
    var unitLabels = svg.append("g")
                .attr("id", "unitLabels")
    var unitsLabel = unitLabels.selectAll("text")
                .data([0])
                .enter().append("text")
                .attr("x", (d, i) => labelXcalc(d, i))
                .attr("y", (d, i) => labelYcalc(d, i))    
                .attr("font-size", opt.unitsFontSize) 
                .attr("text-anchor", "middle")
                .style("fill", opt.unitsLabelCol)
                .style("font-weight", opt.unitsFontWeight)
                .attr("font-family", opt.unitsFont)
                .text(opt.gaugeUnits)      


    //Draw needle
    var needleAngle = [opt.zeroNeedleAngle]
    
    //Define a function for calculating the coordinates of the needle paths (see tick mark equivalent)
    var needleCalc = function() {   
            function pathCalc(d,i) {
                var nAngleRad = dToR(d + 90)
                
                var y1 = originY + (needlePathStart * Math.sin(nAngleRad)),
                    y2 = originY + ((needlePathStart + needlePathLength) * Math.sin(nAngleRad)),
                    x1 = originX + (needlePathStart * Math.cos(nAngleRad)),
                    x2 = originX + ((needlePathStart + needlePathLength) * Math.cos(nAngleRad)),
                    
                    lineData = [{"x": x1, "y": y1}, {"x": x2, "y": y2}];
                
                var lineFunc=d3.line()
                    .x( d=> d.x)
                    .y(d => d.y);
                
                var lineSVG = lineFunc(lineData)
                return lineSVG 
            }
        return pathCalc;
    };
    
    var pathNeedle = needleCalc();

    //Add a group to hold the needle path
    var needleGroup = svg.append("g")
        .attr("id","needle")
    
    //Draw the needle path
    var needlePath = needleGroup.selectAll("path")
        .data(needleAngle)
        .enter().append("path")
        .attr("d", pathNeedle)
        .style("stroke", opt.needleCol)
        .style("stroke-width", opt.needleWidth + "px");  


    //Add Title
    var titleLabels = svg.append("g")
                .attr("id", "logoLabel")
    titleLabels.selectAll("text")
                .data([0])
                .enter().append("text")
                .attr("x",opt.titleOffsetX)
                .attr("y",opt.titleOffsetY)    
                .attr("font-size", opt.titleFontSize) 
                .attr("text-anchor", opt.titleTextAnchor)
                .style("fill", opt.titleCol)
                .style("font-weight", opt.titleFontWeight)
                .style("filter", "url(#drop-shadow-" + opt.divID + ")")
                .attr("font-family", opt.titleFontFamily)
                .text(opt.titleText) 
    // How about a drop shadow?
    // from http://bl.ocks.org/cpbotha/5200394
    var defs = svg.append("defs");
    var filter = defs.append("filter")
    .attr("id", "drop-shadow-" + opt.divID)
    .attr("height", opt.dropShadowHeight);

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", opt.dropShadowBlur)
        .attr("result", "blur");
    
    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", opt.dropShadowDistanceX)
        .attr("dy", opt.dropShadowDistanceY)
        .attr("result", "offsetBlur");
    
    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");
    
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    
    //Animate the transistion of the needle to its starting value
    needlePath.transition()
        .duration(opt.animDuration)
        //.delay(0)
        .ease(d3.easeElasticOut,1,0.9)
        //.attr("transform", function(d) 
        .attrTween("transform", function(d,i,a)
        {
            needleAngle=valueScale(opt.needleVal)
            
            //Check for min/max ends of the needle
            if (needleAngle > opt.maxTickAngle){needleAngle = opt.maxNeedleAngle}
            if (needleAngle < opt.zeroTickAngle){needleAngle = opt.zeroNeedleAngle}
            var needleCentre = originX + "," + originY,
                needleRot = needleAngle - opt.zeroNeedleAngle
            return d3.interpolateString("rotate(0," + needleCentre + ")", "rotate(" + needleRot + "," + needleCentre + ")")
              
        });

    unitsLabel.transition()
    .duration(1000)
    .ease(d3.easeElasticOut,1,0.9)
    .tween("text", function(d) {
        var i = d3.interpolateString(opt.minVal, opt.needleVal)

        return function(t) {
            unitsLabel.text(Math.round(i(t)) + " " + opt.gaugeUnits);
        };
    });
    
    // Function to update the gauge value
    this.updateGauge=function(newVal) {
        //Set default values if necessary
        if(newVal == undefined)(opt.minVal)

        //Animate the transistion of the needle to its new value
        var needlePath = needleGroup.selectAll("path"),
            oldVal = opt.needleVal
        needlePath.transition()
            .duration(1000)
            .ease(d3.easeElasticOut,1,0.9)
            .attrTween("transform", function(d,i,a)
            {
                var needleAngleOld = valueScale(oldVal) - opt.zeroNeedleAngle
                var needleAngleNew = valueScale(newVal) - opt.zeroNeedleAngle

                //Check for min/max ends of the needle
                if (needleAngleOld + opt.zeroNeedleAngle > opt.maxTickAngle){needleAngleOld = opt.maxNeedleAngle - opt.zeroNeedleAngle}
                if (needleAngleOld + opt.zeroNeedleAngle < opt.zeroTickAngle){needleAngleOld = 0}
                if (needleAngleNew + opt.zeroNeedleAngle > opt.maxTickAngle){needleAngleNew = opt.maxNeedleAngle - opt.zeroNeedleAngle}
                if (needleAngleNew + opt.zeroNeedleAngle < opt.zeroTickAngle){needleAngleNew = 0}
                var needleCentre = originX+","+originY
                return d3.interpolateString("rotate(" + needleAngleOld + "," + needleCentre + ")", "rotate(" + needleAngleNew + "," + needleCentre + ")")

            });
        
        unitsLabel.transition()
            .duration(1000)
            .ease(d3.easeElasticOut,1,0.9)
            .tween("text", function(d) {
                var i = d3.interpolateString(oldVal, newVal)
                
                return function(t) {
                    unitsLabel.text(Math.round(i(t)) + " " + opt.gaugeUnits);
                };
        });
        
        //Update the current value
        opt.needleVal = newVal
    }
}

//Turns an angle in degrees to radians
function dToR(angleDeg){
    var angleRad = angleDeg * (Math.PI / 180); 
    return angleRad;
}
