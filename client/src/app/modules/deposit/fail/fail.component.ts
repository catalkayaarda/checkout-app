import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/http/utils/utils.service';

@Component({
  selector: 'fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss'],
})
export class DepositFailComponent implements OnInit {
  public iframeAccessUrl: boolean = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
