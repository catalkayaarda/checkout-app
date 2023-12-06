import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UtilsService } from 'src/app/core/http';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'deposit-success-pop-up',
  templateUrl: './success-pop-up.component.html',
  styleUrls: ['./success-pop-up.component.scss'],
})
export class DepositSuccessPopUpComponent implements OnInit {
  public mobilebghead: string = '564px';
  public message: string = '';
  public bankPage: any;
  public succesState: boolean = false;
  public toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };

  constructor(
    private utilsService: UtilsService,
    private walletService: WalletService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.getStorage('bankPage', 'local')) {
      this.bankPage = this.storageService.getStorage('bankPage', 'local');

      localStorage.removeItem('bankPage');

      let requestData = {
        transaction_id: this.bankPage.transaction_id,
      };

      this.walletService.checkStatus(requestData, this.storageService.getStorage('access', 'local')).subscribe(
        (data) => {
          timer(2000).subscribe((data) => {
            this.router.navigate(['/paypango-wallet/payment-summary']);
          });
        },
        (error) => {
          this.toastMessageParam = {
            toastMessage: true,
            message: error.error.error_message,
            subMessage: '',
          };
          this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
          timer(2000).subscribe((data) => {
            this.router.navigate(['/deposit/fail']);
            this.toastMessageParam.toastMessage = false;
            this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
          });
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
