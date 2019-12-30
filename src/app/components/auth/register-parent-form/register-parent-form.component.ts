import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-parent-form',
  templateUrl: './register-parent-form.component.html',
  styleUrls: ['./register-parent-form.component.css']
})
export class RegisterParentFormComponent {
  @Input() registerParentForm: FormGroup;
  @Input() errorMessage: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
}
