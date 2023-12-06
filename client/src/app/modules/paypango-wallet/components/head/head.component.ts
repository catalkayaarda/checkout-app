import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/core/http';
import { AccountOut, CustomerMeOut } from 'src/app/core/http/wallet/wallet.interface';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'wallet-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  public iframeAccessUrl: boolean = false;
  public user: any;
  public toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };
  constructor(
    private utilsService: UtilsService,
    private storageService: StorageService,
    private router: Router,
    private walletService: WalletService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });

    this.walletService.userSubject.subscribe((data) => {
      this.user = data;
    });
  }

  handlerExit(): void {
    this.toastMessageParam = {
      toastMessage: true,
      message: this.translateService.instant('toastMessage.exitTitle'),
      subMessage: this.translateService.instant('toastMessage.wait'),
    };
    this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
    setTimeout(() => {
      this.toastMessageParam = {
        toastMessage: false,
        message: '',
        subMessage: '',
      };
      this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
      this.storageService.flush('userData');
      this.router.navigate(['/public']);
    }, 2000);
  }
}
