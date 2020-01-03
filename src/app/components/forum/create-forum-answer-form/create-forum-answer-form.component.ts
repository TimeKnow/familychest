import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-forum-answer-form',
  templateUrl: './create-forum-answer-form.component.html',
  styleUrls: ['./create-forum-answer-form.component.css']
})
export class CreateForumAnswerFormComponent {
  @Input() form: FormGroup;
  @Input() errorMessage: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  editorStyles = {
    height: '300px'
  };
  editorPlaceholder: 'Describe the statement...';

}
