import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';

@Component({
  selector: 'app-personal-financial-table',
  templateUrl: './personal-financial-table.component.html',
  styleUrls: ['./personal-financial-table.component.css']
})
export class PersonalFinancialTableComponent {
  @Input() dataList: FinancialStatement[];
  @Output() emitAction: EventEmitter<number> = new EventEmitter<number>();
  dataHeaders: string[] = ['id', 'type', 'amount', 'date', 'actions'];
}
