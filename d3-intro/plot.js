// Set SVG width, height, and padding
const w = 500;
const h = 500;
const padding = 60;

// Load our CSV data
d3.csv('https://raw.githubusercontent.com/naveenv92/python-science-tutorial/master/intro/Absorbance_Data.csv', function (d) {
    return [
        +d['Wavelength'],
        +d['Sample_1_Absorbance'],
        +d['Sample_2_Absorbance']
    ]
}).then(plot_data);

// Data plotting function
function plot_data(data) {
    
    // Set axis limits
    const xMin = 400;
    const xMax = 950;
    const yMin = 0;
    const yMax = 2;

    // Set x and y-axis scales
    const xScale = d3.scaleLinear()
                    .domain([xMin, xMax])
                    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([yMin, yMax])
                    .range([h - padding, padding]);

    
    // Trim data points to only be in range of x-axis
    let data_in_range = [];
    data.forEach(function (e) {
        if (e[0] >= xMin && e[0] <= xMax) {
            data_in_range.push(e);
        }
    });


    // Append an svg to the plot_area div
    const svg = d3.select('#plot_area')
                .append('svg')
                .attr('width', w)
                .attr('height', h);

    // Append path object for sample 1
    svg.append('path')
    .datum(data_in_range)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', d3.line()
                    .x((d) => xScale(d[0]))
                    .y(yScale(0)))
    .transition()
    .duration(1000)
    .attr('d', d3.line()
                 .x((d) => xScale(d[0]))
                 .y((d) => yScale(d[1])));

    // Append path object for sample 2
    svg.append('path')
    .datum(data_in_range)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', d3.line()
                    .x((d) => xScale(d[0]))
                    .y(yScale(0)))
    .transition()
    .duration(1000)
    .attr('d', d3.line()
                    .x((d) => xScale(d[0]))
                    .y((d) => yScale(d[2])));

    // Append circles for hovering points for sample 1
    svg.selectAll('circle_samp_1')
       .data(data_in_range)
       .enter()
       .append('circle')
       .attr('cx', (d) => xScale(d[0]))
       .attr('cy', (d) => yScale(d[1]))
       .attr('r', 4)
       .attr('fill', 'black')
       .attr('class', 'points')
       .style('pointer-events', 'all')
       .append('title')
       .text(function (d) {
           return (
            'Wavelength: ' + d[0] + ' nm' + '\n' + 'Absorbance: ' + d[1]
           );
       });

    // Append circles for hovering for sample 2
    svg.selectAll('circle_samp_2')
       .data(data_in_range)
       .enter()
       .append('circle')
       .attr('cx', (d) => xScale(d[0]))
       .attr('cy', (d) => yScale(d[2]))
       .attr('r', 4)
       .attr('fill', 'steelblue')
       .attr('class', 'points')
       .style('pointer-events', 'all')
       .append('title')
       .text(function (d) {
           return (
            'Wavelength: ' + d[0] + ' nm' + '\n' + 'Absorbance: ' + d[2]
           );
       });

    // Add legend
    svg.append('path')
       .datum([[750, 1.9], [800, 1.9]])
       .attr('stroke', 'black')
       .attr('stroke-width', 2)
       .attr('d', d3.line()
               .x((d) => xScale(d[0]))
               .y((d) => yScale(d[1])));

    svg.append('text')
       .attr('x', xScale(805))
       .attr('y', yScale(1.9))
       .attr('alignment-baseline', 'central')
       .style('font-family', 'sans-serif')
       .style('font-size', '16px')
       .text('Sample 1');

    svg.append('path')
    .datum([[750, 1.7], [800, 1.7]])
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', d3.line()
            .x((d) => xScale(d[0]))
            .y((d) => yScale(d[1])));

    svg.append('text')
       .attr('x', xScale(805))
       .attr('y', yScale(1.7))
       .attr('alignment-baseline', 'central')
       .style('font-family', 'sans-serif')
       .style('font-size', '16px')
       .text('Sample 2');

    // Add x-axis
    svg.append('g')
    .style('font-size', '12px')
    .attr('transform', 'translate(0,' + (h - padding) + ')')
    .call(d3.axisBottom(xScale));

    // Add x-axis label
    svg.append('text')
       .attr('x', w/2)
       .attr('y', h - 15)
       .attr('text-anchor', 'middle')
       .style('font-family', 'sans-serif')
       .text('Wavelength (nm)');

    // Add y-axis
    svg.append('g')
    .style('font-size', '12px')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(d3.axisLeft(yScale));

    // Add y-axis label
    svg.append('text')
       .attr('text-anchor', 'middle')
       .attr('transform', 'translate(15,' + h/2 + ')rotate(-90)')
       .style('font-family', 'sans-serif')
       .text('Absorbance (O.D.)');
}