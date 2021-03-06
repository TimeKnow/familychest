import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-forum-post-form',
  templateUrl: './create-forum-post-form.component.html',
  styleUrls: ['./create-forum-post-form.component.css']
})
export class CreateForumPostFormComponent {
  @Input() form: FormGroup;
  @Input() errorMessage: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

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
            this.form.get('image').setValue(reader.result);
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
