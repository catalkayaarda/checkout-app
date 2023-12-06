import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() show: any;
  @Input() styles = {
    contentHeight: '',
    top: '',
    left: '',
  };
  public orderDetail = [
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
    {
      image: '../../../../assets/images/lens.png',
      title: 'FujifilmXf16-55mmf2.8 R Lm Wr Lens',
      content: 'Tahmini Teslimat Tarihi: 14 - 19 Ağustos (Kargo Bedava)',
      total: 1,
      amount: '9.799 TL',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
