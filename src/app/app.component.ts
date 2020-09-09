import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, Event} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showDetail = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.showDetail = (event as NavigationEnd).url?.length > 1;
      }
    });
  }

}
