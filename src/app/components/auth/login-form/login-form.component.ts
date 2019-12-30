import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Input() loginForm: FormGroup;
  @Input() errorMessage: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
}
