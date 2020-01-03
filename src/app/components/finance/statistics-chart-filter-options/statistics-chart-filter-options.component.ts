import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-statistics-chart-filter-options',
  templateUrl: './statistics-chart-filter-options.component.html',
  styleUrls: ['./statistics-chart-filter-options.component.css']
})
export class StatisticsChartFilterOptionsComponent {
  @Output() dataFilterChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() yearFilterChanged: EventEmitter<string> = new EventEmitter<string>();

  statisticsDataFilters = ['Expense', 'Income', 'Balance'];
  statisticsYearFilters = ['Year', 'Month', 'All'];
}
