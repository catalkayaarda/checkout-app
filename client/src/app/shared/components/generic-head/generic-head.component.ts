import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/http';

@Component({
  selector: 'generic-head',
  templateUrl: './generic-head.component.html',
  styleUrls: ['./generic-head.component.scss'],
})
export class GenericHeadComponent implements OnInit {
  public iframeAccessUrl: any;
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.subIframeAccessUrl.subscribe((data) => {
      this.iframeAccessUrl = data;
    });
  }
}
