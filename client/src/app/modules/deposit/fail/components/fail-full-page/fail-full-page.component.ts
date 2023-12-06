import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'deposit-fail-full-page',
  templateUrl: './fail-full-page.component.html',
  styleUrls: ['./fail-full-page.component.scss'],
})
export class DepositFailFullPageComponent implements OnInit {
  public mobilebghead: string = '564px';

  constructor() {
    if (window.innerWidth < 577) {
      this.mobilebghead = '321px';
    }
  }

  ngOnInit(): void {}
}
