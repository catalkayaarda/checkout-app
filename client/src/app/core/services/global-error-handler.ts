import { ErrorHandler, Injectable } from '@angular/core';

//services
import { UtilsService } from '../http/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private utilsService: UtilsService) {}

  handleError(error: any): void {
    let toastMessageParam = {
      toastMessage: false,
      message: '',
      subMessage: '',
    };

    if (!navigator.onLine) {
      toastMessageParam.toastMessage = true;
      toastMessageParam.message =
        'Lütfen internet bağlantınızı kontrol ediniz.';
    } else {
      toastMessageParam.toastMessage = true;
      toastMessageParam.message = error.error.error_message
        ? error.error.error_message
        : error.error.detail[0].msg;
    }

    this.utilsService.handlerToastMessageSubject(toastMessageParam);

    setTimeout(() => {
      toastMessageParam.toastMessage = false;
      this.utilsService.handlerToastMessageSubject(toastMessageParam);
    }, 2000);
  }
}
