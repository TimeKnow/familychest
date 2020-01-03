import {Component, Input} from '@angular/core';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {ForumAnswer} from '../../../core/models/forum/forum-answer.model';

@Component({
  selector: 'app-forum-post-view',
  templateUrl: './forum-post-view.component.html',
  styleUrls: ['./forum-post-view.component.css']
})
export class ForumPostViewComponent {
  @Input() data: ForumPost;
  @Input() answers: ForumAnswer[];
}
