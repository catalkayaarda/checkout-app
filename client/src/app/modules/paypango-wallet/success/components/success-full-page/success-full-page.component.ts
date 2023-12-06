import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';

@Component({
  selector: 'success-full-page',
  templateUrl: './success-full-page.component.html',
  styleUrls: ['./success-full-page.component.scss'],
})
export class SuccessFullPageComponent implements OnInit {
  public mobilebghead: string = '564px';
  public message: string = '';
  constructor(private routeDataService: RouteDataService, private router: Router) {
    if (window.innerWidth < 577) {
      this.mobilebghead = '321px';
    }
  }

  ngOnInit(): void {
    if (this.routeDataService.readData() && this.routeDataService.readData().message) {
      this.message = this.routeDataService.readData().message;
      localStorage.removeItem('transaction_id');
      localStorage.removeItem('amount');
    } else {
      this.router.navigate(['/public']);
    }

    //Prevent Browser Back button
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event) {
      history.pushState(null, document.title, location.href);
    });
  }
}
