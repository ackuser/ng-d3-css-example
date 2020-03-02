import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild("chart", { static: true }) protected chartContainer: ElementRef;
  svg: any;
  tooltip: any;
  margin: { top: number; right: number; bottom: number; left: number; };
  contentWidth: number;
  contentHeight: number;
  width: number;
  height: number;


  constructor() { }

  ngOnInit(): void {
    this.initChart();

  }

  initChart() {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element)
      .attr("width", "100%")
      .attr("height", "100%"),

      this.margin = {
        top: +this.svg.style("margin-top").replace("px", ""),
        right: +this.svg.style("margin-right").replace("px", ""),
        bottom: +this.svg.style("margin-bottom").replace("px", ""),
        left: +this.svg.style("margin-left").replace("px", "")
      },
      this.width = +this.svg.style("width").replace("px", ""),
      this.height = +this.svg.style("height").replace("px", ""),
      this.contentWidth = this.width - this.margin.left - this.margin.right,
      this.contentHeight = this.height - this.margin.top - this.margin.bottom - 20;
  }


}
