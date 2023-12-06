import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/http';
import { AuthService } from 'src/app/core/http/auth/auth.service';
import { CountryOut } from 'src/app/core/http/utils/utils.interface';
import { Unsub } from 'src/app/shared/implementation/unsub.class';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { phone } from '../../../../../../../node_modules/phone';
@Component({
  selector: 'paypango-wallet-login-popup',
  templateUrl: './paypango-wallet-login-popup.component.html',
  styleUrls: ['./paypango-wallet-login-popup.component.scss'],
})
export class PaypangoWalletLoginPopupComponent extends Unsub implements OnInit {
  @Input() activePaymentType: any;
  public countries: CountryOut = [];
  public phoneValidate = false;
  public showDropdown: boolean = false;
  public searchKeyword: string = '';
  user = {
    phoneNumber: '',
    password: '',
  };
  public selectedDialCode: any = {
    code: '',
    dial_code: '',
    name: '',
  };

  constructor(
    private authService: AuthService,
    private routeDataService: RouteDataService,
    private storageService: StorageService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.utilsService.countries().subscribe((data) => {
      this.countries = data;

      this.selectedDialCode = this.countries.find((country) => country.name === 'Türkiye');
    });
  }

  submitForm(form: NgForm): void {
    if (form.valid && this.phoneValidate) {
      const requestData = {
        phone_number: this.selectedDialCode.dial_code + this.user.phoneNumber,
        password: this.user.password,
      };
      this.authService
        .loginUser(requestData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.routeDataService.createData({
            phoneNumber: this.selectedDialCode.dial_code + this.user.phoneNumber,
          });
          this.storageService.setStorage('otp', data.otp_token, 'local');
          this.storageService.setStorage('userInfo', this.user, 'local');
          this.router.navigate(['/public/login/otp']);
        });
    }
  }

  phoneNumberInput(param: any) {
    this.user.phoneNumber = param;
    if (this.user.phoneNumber) {
      let number = this.selectedDialCode.dial_code + this.user.phoneNumber.toString();

      this.phoneValidate = phone(number).isValid;
    }
  }

  selectDialCode(country: any): void {
    this.selectedDialCode = country;
    this.showDropdown = false;

    if (this.user.phoneNumber) {
      let number = this.selectedDialCode.dial_code + this.user.phoneNumber.toString();

      this.phoneValidate = phone(number).isValid;
    }
  }

  showCountries() {
    this.showDropdown = !this.showDropdown;
    this.searchKeyword = '';
  }
}
