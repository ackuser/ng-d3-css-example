import { Component, OnInit } from '@angular/core';
import { GenericD3Component } from '../generic-d3/generic-d3.component';
import * as d3 from "d3";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends GenericD3Component implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initChart();
    this.createChart();
  }

  createChart() {
    var x = d3.scaleBand().rangeRound([0, this.contentWidth]).padding(0.1),
      y = d3.scaleLinear().rangeRound([this.contentHeight, 0]);

    d3.tsv("../../assets/tsv/data.tsv")
      .then((data) => {
        return data.map((d: any) => {
          d.frequency = +d.frequency;

          return d;
        });
      })
      .then((data) => {
        x.domain(data.map(function (d) { return d.letter; }));
        y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

        this.g
        .append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.contentHeight + ")")
          .call(d3.axisBottom(x));

        this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "%"))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

        this.g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => x(d.letter))
          .attr("y", (d) => y(d.frequency))
          .attr("width", x.bandwidth())
          .attr("height", (d) => this.contentHeight - y(d.frequency));
      })
      .catch((error) => {
        throw error;
      });
  }
}