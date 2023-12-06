import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';

@Component({
  selector: 'fail-full-page',
  templateUrl: './fail-full-page.component.html',
  styleUrls: ['./fail-full-page.component.scss'],
})
export class FailFullPageComponent implements OnInit {
  public mobilebghead: string = '564px';
  public message: string = '';
  constructor(private routeDataService: RouteDataService, private translate: TranslateService, private router: Router) {
    if (window.innerWidth < 577) {
      this.mobilebghead = '321px';
    }
  }

  ngOnInit(): void {
    if (this.routeDataService.readData() && this.routeDataService.readData().error) {
      if (this.routeDataService.readData().message) {
        this.message = this.routeDataService.readData().message;
      } else {
       this.message = this.translate.instant('paypangoWallet.fail.errorGeneric');
        }
      this.routeDataService.deleteData();
    }
    else {
           this.message = this.translate.instant('paypangoWallet.fail.noProcess');
       } 
  }
}
