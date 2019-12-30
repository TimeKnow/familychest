import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Family} from '../../../core/models/family/family.model';

@Component({
  selector: 'app-child-creation-form',
  templateUrl: './child-creation-form.component.html',
  styleUrls: ['./child-creation-form.component.css']
})
export class ChildCreationFormComponent {
  @Input() form: FormGroup;
  @Input() families: Family[];
  @Input() errorMessage: string;
  @Input() generatedCode: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
}
