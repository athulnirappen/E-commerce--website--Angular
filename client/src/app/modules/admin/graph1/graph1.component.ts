import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css'],
})
export class Graph1Component {
  Highcharts = Highcharts;
  chartOptions = {}
  
  constructor() {
    this.chartOptions = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: 'Total Products Selling Chart',
        align: 'left',
      },
      
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Share',
          data: [
            ['WashingMachine', 23],
            ['Airconditioner', 18],
            {
              name: 'Mixer',
              y: 12,
              sliced: true,
              selected: true,
            },
            ['Chair*', 9],
            ['Table', 8],
            ['Others', 30],
          ],
        },
      ],
    };
  }
}





