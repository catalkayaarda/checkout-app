import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/http/utils/utils.service';

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  public iframeAccessUrl: boolean = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
