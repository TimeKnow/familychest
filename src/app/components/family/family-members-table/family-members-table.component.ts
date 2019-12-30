import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FamilyUser} from '../../../core/models/family/family-user.model';

@Component({
  selector: 'app-family-members-table',
  templateUrl: './family-members-table.component.html',
  styleUrls: ['./family-members-table.component.css']
})
export class FamilyMembersTableComponent implements OnInit {
  @Input() dataList: FamilyUser[];
  @Input() hasActions = true;
  @Output() emitAction: EventEmitter<string> = new EventEmitter<string>();
  dataHeaders: string[];

  ngOnInit(): void {
    if (this.hasActions) {
      this.dataHeaders = ['id', 'email', 'name', 'role', 'actions'];
    } else {
      this.dataHeaders = ['id', 'email', 'name', 'role'];
    }
  }
}
