import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-financial-statistics-charts',
  templateUrl: './financial-statistics-charts.component.html',
  styleUrls: ['./financial-statistics-charts.component.css']
})
export class FinancialStatisticsChartsComponent {
  @Input() chartData: any[];
  @Input() chartTitle = 'Financial Statements';
  chartColumns: string[] = ['data', 'amount'];
  chartType = 'LineChart';
  chartHeight = 400;
  chartOptions = {
    colors: ['#0088eb', '#2503e6', '#19abec', '#52def3', '#08f6d7'],
    is3D: true,
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    bar: {groupWidth: '75%'},
  };
}
