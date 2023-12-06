import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';

@Component({
  selector: 'fail-pop-up',
  templateUrl: './fail-pop-up.component.html',
  styleUrls: ['./fail-pop-up.component.scss'],
})
export class FailPopUpComponent implements OnInit {
  public message: string = '';
  constructor(private routeDataService: RouteDataService, private translate: TranslateService, private router: Router) {}
  ngOnInit(): void {
    if (this.routeDataService.readData() && this.routeDataService.readData().error) {
      if (this.routeDataService.readData().message) {
        this.message = this.routeDataService.readData().message;
      } else {
        this.translate.get('paypangoWallet.fail.genericError').subscribe((data) => (this.message = data));
      }
      this.routeDataService.deleteData();
    } else {
      this.router.navigate(['/public']);
    }
  }
}
