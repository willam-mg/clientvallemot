import { Component } from '@angular/core';
import { LoadingService } from './loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vallemotors';  
  constructor() {
  }

  onActivate(event) {
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20); // how far to scroll on each step
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 16);
  }
}
