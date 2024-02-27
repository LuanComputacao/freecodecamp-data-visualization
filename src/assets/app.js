import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

const w = 500;
const h = 100;

function drawChart(data) {
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d[0]))
    .range([0, w]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([h, 0]);

  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', w + 100)
    .attr('height', h + 60)

  svg.append('text')
    .attr('id', 'title')
    .attr('x', w / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .text('GDP Over Time');

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(50, ${h})`)
    .call(d3.axisBottom(xScale))
    .selectAll(".tick")
    .attr("class", "tick");

  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(50,0)')
    .call(d3.axisLeft(yScale))
    .selectAll(".tick")
    .attr("class", "tick");

  svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d[0]) + 50)
    .attr('y', d => yScale(d[1]))
    .attr('width', w / data.length - 1)
    .attr('height', d => h - yScale(d[1]))
    .attr('fill', 'navy')
    .attr('data-date', d => d3.timeFormat("%Y-%m-%d")(d[0]))
    .attr('data-gdp', d => d[1]);
}

async function getGDPData() {
  let data = null;

  await fetch('assets/GDP-data.json')
    .then((response) => response.json())
    .then((json) => {
      data = json.data;
    });

  return data;
}

async function main() {
  const data = await getGDPData();
  console.log(data);
  drawChart(data);
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
