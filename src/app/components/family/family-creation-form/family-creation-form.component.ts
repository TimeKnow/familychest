import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-family-creation-form',
  templateUrl: './family-creation-form.component.html',
  styleUrls: ['./family-creation-form.component.css']
})
export class FamilyCreationFormComponent {
  @Input() form: FormGroup;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
}
