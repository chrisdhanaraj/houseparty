angular.module('player.winloss', [])
  .directive('winloss', function(){

    var linker = function(scope, element, attrs) {
      var data = scope.data;

      var dataset = [
        {
          'state': 'Wins',
          'number' : data.wins
        },
        {
          'state': 'Losses',
          'number' : data.losses
        }
      ];

      var margin = { top: 20, right: 0, bottom: 20, left: 0};
      var w = 300 - margin.left - margin.right,
          h = 300 - margin.top - margin.bottom;

      var svg = d3.select('#winChart').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')');

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) {
          return d.number;
        });


      var xScale = d3.scale.ordinal()
        .domain(_.map(dataset, function(d) {
          return d.number;
        }))
        .rangeBands([0, w], 0.1, 0.5);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function(d, i) {
          return dataset[i].state;
        })
        .tickSize([3])
        .tickPadding([10])
        .orient('bottom');

      var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {
          return d.number;
        }) * 1.1])
        .range([0, h]);

      var colorScale = d3.scale.quantize()
        .domain([0, dataset.length])
        .range(['#2EDE00', '#E90E0E']);

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d, i) {
          return xScale(d.number);
        })
        .attr('y', function(d) {
          return h - yScale(d.number);
        })
        .attr('width', xScale.rangeBand())
        .attr('height', function(d) {
          return yScale(d.number);
        })
        .attr('fill', function(d, i) {
          return colorScale(i);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

      svg.append('g')
        .attr('height', 2)
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis);

      svg.call(tip);

    };

    return {
      link: linker,
      scope: {
        data:'=data',
      },
      templateUrl: 'app/player/charts/winloss.tmpl.html'
    }
  })
;