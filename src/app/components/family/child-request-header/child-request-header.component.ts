import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChildRequest} from '../../../core/models/family/child-request.model';
import {ChildRequestAction, ChildRequestActionTypeArray} from '../../../core/models/family/child-request-action';

@Component({
  selector: 'app-child-request-header',
  templateUrl: './child-request-header.component.html',
  styleUrls: ['./child-request-header.component.css']
})
export class ChildRequestHeaderComponent {
  @Input() request: ChildRequest;
  @Input() familyId: number;
  @Input() hasActions = true;
  @Output() optionPressed: EventEmitter<ChildRequestAction> = new EventEmitter<ChildRequestAction>();

  actionTypes = ChildRequestActionTypeArray;
}
