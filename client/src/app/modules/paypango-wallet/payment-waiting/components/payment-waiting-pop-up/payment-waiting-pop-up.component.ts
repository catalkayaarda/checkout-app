import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'payment-waiting-pop-up',
  templateUrl: './payment-waiting-pop-up.component.html',
  styleUrls: ['./payment-waiting-pop-up.component.scss'],
})
export class PaymentWaitingPopUpComponent implements OnInit {
  public transactionId: string = '';

  constructor(
    private routeDataService: RouteDataService,
    private walletService: WalletService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.routeDataService.readData() && this.routeDataService.readData().amount) {
      this.walletService.walletPay(this.routeDataService.readData().transactionId, this.storageService.getStorage('access', 'local')).subscribe(
        (data) => {
          this.router.navigate(['/paypango-wallet/success']);
          this.routeDataService.deleteData();

          this.routeDataService.createData({
            message: data.message,
          });
        },
        (err) => {
          this.routeDataService.createData({
            message: err.error.error_message,
            error: true,
          });

          this.router.navigate(['/paypango-wallet/fail']);
        }
      );
    } else {
      this.router.navigate(['/public']);
    }
  }
}
