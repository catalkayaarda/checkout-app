import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cipherData: any = null;
  private decipherData: any = null;

  constructor(@Inject('systemConfig') public SystemConfig: any) {
    this.cipherData = this.cipher(this.SystemConfig.cipherKey || 'j13FGw39L');
    this.decipherData = this.decipher(
      this.SystemConfig.cipherKey || 'j13FGw39L'
    );
  }

  setStorage(key: string, data: any, type: any = 'local') {
    let storagedata = this.cipherData(JSON.stringify(data));
    switch (type) {
      case 'local':
        localStorage.setItem(key, storagedata);
        break;
      case 'session':
        sessionStorage.setItem(key, storagedata);
        break;
    }
  }

  getStorage(key: string, type: any = 'local') {
    let storagedata: any = 'undefined';
    switch (type) {
      case 'local':
        storagedata = localStorage.getItem(key);
        break;
      case 'session':
        storagedata = sessionStorage.getItem(key);
        break;
    }
    if (storagedata && storagedata != 'undefined') {
      if (!this.chipperChecker(storagedata)) {
        return JSON.parse(this.decipherData(storagedata));
      } else {
        return JSON.parse(storagedata);
      }
    } else {
      return null;
    }
  }

  flush(key: string, type: any = 'local') {
    switch (type) {
      case 'local':
        localStorage.removeItem(key);
        break;
      case 'session':
        sessionStorage.removeItem(key);
        break;
    }
  }

  cipher = (salt: any) => {
    let textToChars = (text: any) =>
      text.split('').map((c: any) => c.charCodeAt(0));
    let byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
    let applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    return (text: any) =>
      text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  };

  decipher = (salt: any) => {
    let textToChars = (text: any) =>
      text.split('').map((c: any) => c.charCodeAt(0));
    let saltChars = textToChars(salt);
    let applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
    return (encoded: any) =>
      encoded
        .match(/.{1,2}/g)
        .map((hex: any) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: any) => String.fromCharCode(charCode))
        .join('');
  };

  chipperChecker(item: string) {
    try {
      JSON.parse(item);
      return true;
    } catch (error) {
      return false;
    }
  }
}
