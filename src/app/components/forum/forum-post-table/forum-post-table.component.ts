import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ForumPost} from '../../../core/models/forum/forum-post.model';

const batchSize = 2;
@Component({
  selector: 'app-forum-post-table',
  templateUrl: './forum-post-table.component.html',
  styleUrls: ['./forum-post-table.component.css']
})
export class ForumPostTableComponent implements OnInit, OnChanges {
  @Input() data: ForumPost[];
  displayedData: ForumPost[] = [];
  displayedCount = 1;

  ngOnInit(): void {
    this.initDisplayedData();
  }

  initDisplayedData() {
    this.displayedCount = 1;
    this.displayedData = this.data.slice(0, this.displayedCount);
  }

  onScrollDown() {
    this.displayedCount = this.displayedCount + batchSize < this.data.length ? this.displayedCount + batchSize : this.data.length;
    this.displayedData = this.data.slice(0, this.displayedCount);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.initDisplayedData();
    }
  }
}
