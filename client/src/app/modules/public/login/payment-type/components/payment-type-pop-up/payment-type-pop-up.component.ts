import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'payment-type-pop-up',
  templateUrl: './payment-type-pop-up.component.html',
  styleUrls: ['./payment-type-pop-up.component.scss'],
})
export class PaymentTypePopUpComponent implements OnInit {
  public activePaymentType: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

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
