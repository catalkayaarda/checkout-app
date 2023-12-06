import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { Unsub } from 'src/app/shared/implementation/unsub.class';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'paypango-wallet',
  templateUrl: './paypango-wallet.component.html',
  styleUrls: ['./paypango-wallet.component.scss'],
})
export class PaypangoWalletComponent extends Unsub {
  constructor(private walletService: WalletService, private storageService: StorageService, private router: Router) {
    super();
    this.walletService.user(this.storageService.getStorage('access', 'local')).subscribe((data) => {
      this.walletService.handlerChangeUserSubject(data);
    });

    if(!localStorage.getItem("transaction_id") && !localStorage.getItem("amount")){      
      this.router.navigate(['/paypango-wallet/fail']);
    }
  }
}
