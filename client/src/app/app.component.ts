import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './core/http/utils/utils.service';
import { WalletService } from './core/http/wallet/wallet.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public iframeAccessUrl: boolean = false;
  public toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };

  constructor(
    private utilsService: UtilsService,
    private changeDetection: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('tr');
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params.iframe) {
        let value = params.iframe === 'true';
        this.utilsService.handlerIframeAccessUrlSubject(value);
        this.utilsService.subIframeAccessUrl.subscribe((data) => {
          this.iframeAccessUrl = data;
        });
      }

      if (params.transaction_id && params.amount) {
        localStorage.setItem('transaction_id', params.transaction_id);
        localStorage.setItem('amount', params.amount);
      }
    });

    this.utilsService.sub.subscribe((data) => {
      this.toastMessageParam = data;
      this.changeDetection.detectChanges();
    });
  }
}
