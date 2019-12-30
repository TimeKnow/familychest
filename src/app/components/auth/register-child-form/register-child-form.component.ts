import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-child-form',
  templateUrl: './register-child-form.component.html',
  styleUrls: ['./register-child-form.component.css']
})
export class RegisterChildFormComponent {
  @Input() registerChildForm: FormGroup;
  @Input() errorMessage: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
}
