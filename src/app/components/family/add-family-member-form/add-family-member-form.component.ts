import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {FamilyUserRolesArray} from '../../../core/models/family/family-user-roles';
import {Family} from '../../../core/models/family/family.model';

@Component({
  selector: 'app-add-family-member-form',
  templateUrl: './add-family-member-form.component.html',
  styleUrls: ['./add-family-member-form.component.css']
})
export class AddFamilyMemberFormComponent {
  @Input() form: FormGroup;
  @Input() users: AuthUser[];
  @Input() families: Family[];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  familyRoles = [...FamilyUserRolesArray];
}
