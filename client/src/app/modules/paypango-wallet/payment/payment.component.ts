import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/http/utils/utils.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public iframeAccessUrl: boolean = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
