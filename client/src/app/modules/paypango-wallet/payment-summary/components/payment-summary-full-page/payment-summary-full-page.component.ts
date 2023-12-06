import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/http';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { Unsub } from 'src/app/shared/implementation/unsub.class';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'payment-summary-full-page',
  templateUrl: './payment-summary-full-page.component.html',
  styleUrls: ['./payment-summary-full-page.component.scss'],
})
export class PaymentSummaryFullPageComponent extends Unsub implements OnInit {
  public mobilebghead: string = '564px';
  public orderInformation: boolean = false;
  public orderDetailShow: boolean = false;
  public totalBalance: number = 0;
  public currency: string = '';
  public debit: number = 0;
  public credit: number = 0;
  public amount: any;
  public transactionId: string = '';
  public orderDetailStyle = {
    contentHeight: '297px',
    top: '127px',
    left: '0',
  };
  public noDiscountStyle = {
    contentHeight: '212px',
    top: '229px',
    left: '0',
  };
  public orderDetail = [
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos(Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
  ];

  constructor(
    private utilsService: UtilsService,
    private walletService: WalletService,
    private storageService: StorageService,
    private router: Router,
    private routeDataService: RouteDataService
  ) {
    super();
    if (window.innerWidth < 577) {
      this.mobilebghead = '563px';
      this.orderDetailStyle.contentHeight = '560px';
      this.orderDetailStyle.top = '40px';
      this.noDiscountStyle.contentHeight = '360px';
      this.noDiscountStyle.top = '386px';
    }
  }

  ngOnInit(): void {
    this.transactionId = JSON.parse(JSON.stringify(localStorage.getItem('transaction_id')));
    this.amount = localStorage.getItem('amount');

    this.walletService
      .account(this.storageService.getStorage('access', 'local'))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.debit = data[0].balance;
        this.credit = data[1].balance;
        this.totalBalance = this.debit + this.credit;
        this.currency = data[0].currency_code;

        if (this.totalBalance <= this.amount) {
          this.router.navigate(['/paypango-wallet/payment']);
        }
      });
  }

  sendData(): void {
    this.routeDataService.createData({
      currency: this.currency,
      amount: this.amount,
      transactionId: this.transactionId,
    });
    this.router.navigate(['/paypango-wallet/payment-waiting']);
  }
}
