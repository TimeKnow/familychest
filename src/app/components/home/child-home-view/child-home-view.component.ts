import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserNotification} from '../../../core/models/auth/user-notification.model';

@Component({
  selector: 'app-child-home-view',
  templateUrl: './child-home-view.component.html',
  styleUrls: ['./child-home-view.component.css']
})
export class ChildHomeViewComponent {
  @Input() notification: UserNotification;
  @Output() notificationRemove = new EventEmitter<any>();
}
