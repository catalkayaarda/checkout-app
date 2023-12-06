import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { UtilsService } from 'src/app/core/http';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class DepositSuccessComponent implements OnInit {
  public mobilebghead: string = '564px';
  public iframeAccessUrl: any;
  public resultPage = {
    title: '',
    buttonText: '',
    success: {
      subtitle: '',
      text: '',
    },
  };
  public toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };

  constructor(private utilsService: UtilsService, private walletService: WalletService, private storageService: StorageService) {}

  public bankPage: any;

  ngOnInit(): void {
    if (window.innerWidth < 577) {
      this.mobilebghead = '321px';
    }
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
