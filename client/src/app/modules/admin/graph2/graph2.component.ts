import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css'],
})
export class Graph2Component {
  Highcharts = Highcharts;
  chartOptions = {};

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Total Profit Of the Years',
        align: 'left',
      },
      
      xAxis: {
        categories: ['2024', '2023', '2022', '2021', '2020', '2019'],
        crosshair: true,
        accessibility: {
          description: 'Years',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '1000 metric tons (MT)',
        },
      },
      tooltip: {
        valueSuffix: ' (1000 MT)',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'products',
          data: [406292, 260000, 107000, 68300, 27500, 14500],
        },
        {
          name: 'orders',
          data: [51086, 136000, 5500, 141000, 107180, 77000],
        },
      ],
    };
  }
}




