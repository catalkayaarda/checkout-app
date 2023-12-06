import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/http/utils/utils.service';

@Component({
  selector: 'payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss'],
})
export class PaymentTypeComponent implements OnInit {
  public iframeAccessUrl: boolean = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
