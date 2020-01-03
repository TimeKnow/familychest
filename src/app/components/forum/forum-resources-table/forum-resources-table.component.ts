import {Component, Input} from '@angular/core';
import {FinancialResource} from '../../../core/models/forum/financial-resource.model';

@Component({
  selector: 'app-forum-resources-table',
  templateUrl: './forum-resources-table.component.html',
  styleUrls: ['./forum-resources-table.component.css']
})
export class ForumResourcesTableComponent {
  @Input() dataList: FinancialResource[];
  dataHeaders: string[] = ['id', 'title', 'type', 'context', 'actions'];
}
