import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FamilyMemberFinancialStatus} from '../../../core/models/finance/family-member-financial-status';

@Component({
  selector: 'app-family-financial-table',
  templateUrl: './family-financial-table.component.html',
  styleUrls: ['./family-financial-table.component.css']
})
export class FamilyFinancialTableComponent {
  @Input() dataList: FamilyMemberFinancialStatus[];
  dataHeaders: string[] = ['userId', 'name', 'email', 'currentAccountBalance', 'statementCoefficient'];
}
