import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ForumPost} from '../../../core/models/forum/forum-post.model';

@Component({
  selector: 'app-forum-post-header',
  templateUrl: './forum-post-header.component.html',
  styleUrls: ['./forum-post-header.component.css']
})
export class ForumPostHeaderComponent {
  @Input() data: ForumPost;

  constructor(private changeRef: ChangeDetectorRef) {
  }

  buttonColor = 'accent';

  onFavorite() {
    this.buttonColor = this.buttonColor === 'accent' ? 'primary' : 'accent';
    this.changeRef.detectChanges();
  }
}
