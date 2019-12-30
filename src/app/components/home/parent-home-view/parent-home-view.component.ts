import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserNotification} from '../../../core/models/auth/user-notification.model';

@Component({
  selector: 'app-parent-home-view',
  templateUrl: './parent-home-view.component.html',
  styleUrls: ['./parent-home-view.component.css']
})
export class ParentHomeViewComponent {
  @Input() notification: UserNotification;
  @Output() notificationRemove = new EventEmitter<any>();
}
