import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/http/wallet/wallet.service';
import { luhnCheck } from '../../../../../shared/helpers/luhnCheck';
import { getCardImage } from '../../../../../shared/helpers/cardImage';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
@Component({
  selector: 'payment-full-page',
  templateUrl: './payment-full-page.component.html',
  styleUrls: ['./payment-full-page.component.scss'],
})
export class PaymentFullPageComponent implements OnInit {
  public mobilebghead: string = '564px';
  public orderInformation: boolean = false;
  public cardImg: any = '';
  public luhnCheckControl: any = false;
  public checkExpDate = false;
  public transactionId: string = '';
  public currency: string = '';
  public amount: any;
  public cardInfo = {
    card_number: '',
    card_holder: '',
    card_exp_date: '',
    cvc: '',
  };
  public amountData: any;
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
  public orderDetailShow: boolean = false;
  public orderDetailStyle = {
    contentHeight: '327px',
    top: '127px',
    left: '0',
  };
  public noDiscountStyle = {
    contentHeight: '327px',
    top: '229px',
    left: '0',
  };

  constructor(private walletService: WalletService, private router: Router, private storageService: StorageService) {
    if (window.innerWidth < 577) {
      this.mobilebghead = '564px';
      this.orderDetailStyle.contentHeight = '733px';
      this.orderDetailStyle.top = '40px';
      this.noDiscountStyle.contentHeight = '360px';
      this.noDiscountStyle.top = '386px';
    }
  }

  ngOnInit(): void {
    this.transactionId = JSON.parse(JSON.stringify(localStorage.getItem('transaction_id')));
    this.amount = localStorage.getItem('amount');
    this.amountData = this.amount;
    this.walletService.account(this.storageService.getStorage('access', 'local')).subscribe((data) => {
      this.currency = data[0].currency_code;
    });
  }

  async submitForm(form: NgForm) {
    if (this.cardInfo.card_number) {
      this.luhnCheckControl = await luhnCheck(this.cardInfo.card_number);
    }

    if (form.valid && this.luhnCheckControl && !this.checkExpDate) {
      if (!this.transactionId) {
        this.router.navigate(['/']);
      }
      let requestData = {
        transaction_id: this.transactionId,
        amount: this.amount,
        currency: this.currency,
        card_exp_date: this.cardInfo.card_exp_date,
        card_holder: this.cardInfo.card_holder,
        card_number: this.cardInfo.card_number.replace(/ /gi, ''),
        cvv: this.cardInfo.cvc,
      };
      this.walletService.loadMoney(requestData, this.storageService.getStorage('access', 'local')).subscribe((data) => {
        this.storageService.setStorage('bankPage', data, 'local');
        window.location.href = data.redirect_url;
      });
    }
  }

  updateCardHolder($event: any) {
    this.cardInfo.card_holder = $event;
  }

  handlerCardNumber(event: any) {
    const pattern = /[0-9]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  handlerCardCvc(event: any) {
    const pattern = /[0-9]/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async onInput(param: any) {
    this.cardInfo.card_number = param
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();

    this.luhnCheckControl = await luhnCheck(this.cardInfo.card_number);
    this.cardImg = getCardImage(this.cardInfo.card_number);
  }

  onPaste(event: ClipboardEvent) {
    // @ts-ignore
    let pastedText = event.clipboardData.getData('text');
    pastedText = pastedText.replace(/\s/g, ''); // delete all empty space make standart format (11111111111)
    const inputChar = pastedText;

    if (!inputChar.match(/^[0-9\s]*$/) || pastedText.length > 16) {
      event.preventDefault();
    }
  }

  expireDateChange(param: any) {
    this.cardInfo.card_exp_date = param;
    let regex: any = this.cardInfo.card_exp_date.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);

    if (this.cardInfo.card_exp_date.toString().length == 5 && regex) {
      let expValue = new Date(this.checkFullYearFormat(1 * regex[2]), 1 * regex[1] - 1, 1).valueOf();

      let now = new Date();
      let currenValue = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();
      if (expValue <= currenValue) {
        this.checkExpDate = true;
      } else {
        this.checkExpDate = false;
      }
    } else {
      this.checkExpDate = true;
    }
  }

  checkFullYearFormat(yearVal: number) {
    let fixedYear = 20;
    if (yearVal < 100) {
      let nowYear = new Date().getFullYear();
      yearVal += Math.floor(nowYear / 100) * 100;
      if (yearVal > nowYear + fixedYear) {
        yearVal -= 100;
      } else if (yearVal <= nowYear - 100 + fixedYear) {
        yearVal += 100;
      }
    }
    return yearVal;
  }

  handlerCardExpDate(event: any) {
    const pattern = /[0-9]/;
    const inputChar = event.key;

    if (this.cardInfo.card_exp_date && this.cardInfo.card_exp_date.toString().length == 2) {
      this.cardInfo.card_exp_date = this.cardInfo.card_exp_date.concat('/');
    }

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
