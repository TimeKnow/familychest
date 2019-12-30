import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.css']
})
export class CardButtonComponent {
  @Input() title: string;
  @Input() urlRedirect: string;
  @Input() description?: string;

  constructor(private router: Router) {
  }

  async onClick() {
    if (this.urlRedirect) {
      await this.router.navigateByUrl(this.urlRedirect);
    }
  }

}
