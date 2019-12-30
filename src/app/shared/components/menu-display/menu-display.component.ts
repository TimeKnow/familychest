import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthUser} from '../../../core/models/auth/auth-user.model';

@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  styleUrls: ['./menu-display.component.css']
})
export class MenuDisplayComponent {
  @Input() currentUser: AuthUser;
  @Output() logout = new EventEmitter<any>();
}
