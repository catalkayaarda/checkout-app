import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'payment-type-full-page',
  templateUrl: './payment-type-full-page.component.html',
  styleUrls: ['./payment-type-full-page.component.scss'],
})
export class PaymentTypeFullPageComponent implements OnInit {
  public activePaymentType: number = 1;
  public qrCode: boolean = false;
  public mobilebghead: string = '564px';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    if (window.innerWidth < 577) {
      this.mobilebghead = '388px';
    }
  }

  ngOnInit(): void {
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('tab');
    if (queryParam) {
      this.activePaymentType = +queryParam;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { tab: null },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    }
  }

  handlerChangeTab(param: number) {
    this.activePaymentType = param;
  }
}
