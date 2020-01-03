import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ChildRequest} from '../../../core/models/family/child-request.model';
import {ChildRequestAction} from '../../../core/models/family/child-request-action';

const batchSize = 2;

@Component({
  selector: 'app-child-requests-dashboard-table',
  templateUrl: './child-requests-dashboard-table.component.html',
  styleUrls: ['./child-requests-dashboard-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildRequestsDashboardTableComponent implements OnInit, OnChanges {
  @Input() data: ChildRequest[];
  @Input() familyId: number;
  @Input() hasActions = true;
  @Output() optionPressed: EventEmitter<ChildRequestAction> = new EventEmitter<ChildRequestAction>();
  displayedData: ChildRequest[] = [];
  displayedCount = 1;

  ngOnInit(): void {
    this.initDisplayedData();
  }

  initDisplayedData() {
    this.displayedCount = 1;
    this.displayedData = this.data.slice(0, this.displayedCount);
  }

  onScrollDown() {
    this.displayedCount = this.displayedCount + batchSize < this.data.length ? this.displayedCount + batchSize : this.data.length;
    this.displayedData = this.data.slice(0, this.displayedCount);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.initDisplayedData();
    }
  }
}
