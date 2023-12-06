import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/http';
import { AuthService } from 'src/app/core/http/auth/auth.service';
import { Unsub } from 'src/app/shared/implementation/unsub.class';
import { RouteDataService } from 'src/app/shared/services/route-data/route-data.service';
import { StorageService } from '../../../../../../shared/services/storage/storage.service';
@Component({
  selector: 'otp-pop-up',
  templateUrl: './otp-pop-up.component.html',
  styleUrls: ['./otp-pop-up.component.scss'],
})
export class OtpPopUpComponent extends Unsub implements OnInit {
  @ViewChild('formDataCode1') public elementRef1!: ElementRef;
  @ViewChild('formDataCode2') public elementRef2!: ElementRef;
  @ViewChild('formDataCode3') public elementRef3!: ElementRef;
  @ViewChild('formDataCode4') public elementRef4!: ElementRef;
  @ViewChild('formDataCode5') public elementRef5!: ElementRef;
  @ViewChild('formDataCode6') public elementRef6!: ElementRef;
  public tab = 1;
  public formData = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };
  public phoneNumber: string = '';
  public toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };
  public countDown!: Subscription;
  public counter!: number;
  public tick = 1000;
  public sendRepeatRequest: boolean = false;

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private storageService: StorageService,
    private translateService: TranslateService,
    private routeDataService: RouteDataService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.handlerCounter(120);
    if (this.routeDataService.readData() && this.routeDataService.readData().phoneNumber) {
      this.phoneNumber = this.routeDataService.readData().phoneNumber;
      this.routeDataService.deleteData();
    } else {
      this.router.navigate(['/public']);
    }
  }

  handlerCounter(counter: number) {
    this.counter = counter;
    this.countDown = timer(0, this.tick)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.counter != 0) {
          --this.counter;
        } else {
          this.toastMessageParam = {
            toastMessage: true,
            message: this.translateService.instant('public.otp.toastMessage.error.title'),
            subMessage: this.translateService.instant('public.otp.toastMessage.error.subtitle'),
          };
          this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
          this.countDown.unsubscribe();
          setTimeout(() => {
            this.toastMessageParam.toastMessage = false;
            this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
            this.router.navigate(['/public/login/step']);
          }, 2000);
        }
      });
  }

  submitForm(form: NgForm) {
    if (form.valid && this.counter != 0) {
      let otp_token =
        this.formData.code1 + this.formData.code2 + this.formData.code3 + this.formData.code4 + this.formData.code5 + this.formData.code6;
      let password = '';
      password = this.storageService.getStorage('userInfo').password;
      let formData = {
        phone_number: this.phoneNumber,
        password,
        otp_token,
      };
      this.authService.token(formData).subscribe((data) => {
        this.countDown.unsubscribe();
        this.storageService.flush('otp');
        this.storageService.setStorage('access', data.access_token, 'local');
        this.router.navigate(['/paypango-wallet']);
        setTimeout(() => {
          this.toastMessageParam.toastMessage = false;
          this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
        }, 3000);
      });
    }
  }

  onFocusInput(event: any) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 9) {
      if (event.code != 'Backspace' && event.code != 'Tab') {
        if (this.tab == 1) {
          this.formData.code1 = event.key;
        }
        if (this.tab == 2) {
          this.formData.code2 = event.key;
        }
        if (this.tab == 3) {
          this.formData.code3 = event.key;
        }
        if (this.tab == 4) {
          this.formData.code4 = event.key;
        }
        if (this.tab == 5) {
          this.formData.code5 = event.key;
        }
        if (this.tab == 6) {
          this.formData.code6 = event.key;
        }
      }

      if (event.code == 'Backspace') {
        if (this.tab > 1) {
          this.tab--;
        }
      } else {
        if (this.tab < 6) {
          this.tab++;
        }
      }
      if (this.tab == 1) {
        this.elementRef1.nativeElement.focus();
      }
      if (this.tab == 2) {
        this.elementRef2.nativeElement.focus();
      }
      if (this.tab == 3) {
        this.elementRef3.nativeElement.focus();
      }
      if (this.tab == 4) {
        this.elementRef4.nativeElement.focus();
      }
      if (this.tab == 5) {
        this.elementRef5.nativeElement.focus();
      }
      if (this.tab == 6) {
        this.elementRef6.nativeElement.focus();
      }
    }
  }

  handleInputFocus(element: any, tab: number) {
    this.tab = tab;
    element.nativeElement.focus();
  }

  sendRepeatCode() {
    this.sendRepeatRequest = true;
    if (this.sendRepeatRequest == true && this.counter < 60) {
      this.countDown.unsubscribe();
      this.authService.authOtpResend(this.storageService.getStorage('otp')).subscribe(
        (data) => {
          this.toastMessageParam = {
            toastMessage: true,
            message: data.message,
            subMessage: '',
          };
          this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
          this.tab = 1;
          setTimeout(() => {
            this.toastMessageParam.toastMessage = false;
            this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
            this.handlerCounter(120);
            this.sendRepeatRequest = false;
          }, 2000);
        },
        (error) => {
          this.toastMessageParam = {
            toastMessage: true,
            message: error.error.error_message ? error.error.error_message : error.error.detail[0].msg,
            subMessage: '',
          };
          this.utilsService.handlerToastMessageSubject(this.toastMessageParam);
          setTimeout(() => {
            this.toastMessageParam.toastMessage = false;
            this.router.navigate(['/public/login/step']);
          }, 2000);
        }
      );
      this.formData = {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
      };
    }
  }
}
