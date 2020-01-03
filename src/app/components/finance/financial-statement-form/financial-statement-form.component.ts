import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FinancialStatementType} from '../../../core/models/finance/financial-statement-type';
import {Family} from '../../../core/models/family/family.model';

@Component({
  selector: 'app-financial-statement-form',
  templateUrl: './financial-statement-form.component.html',
  styleUrls: ['./financial-statement-form.component.css']
})
export class FinancialStatementFormComponent {
  @Input() form: FormGroup;
  @Input() errorMessage: string;
  @Input() families: Family[];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();


  statementTypes = [FinancialStatementType.Expense, FinancialStatementType.Income];
  editorStyles = {
    height: '300px'
  };
  editorPlaceholder: 'Describe the statement...';

  images = [];

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      const reader = new FileReader();
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.images.push(reader.result);
          };
        });
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }

  removeImage(image: string) {
    this.images.splice(this.images.indexOf(image), 1);
  }
}
