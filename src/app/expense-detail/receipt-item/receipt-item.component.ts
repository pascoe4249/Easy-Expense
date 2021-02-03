import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-item',
  templateUrl: './receipt-item.component.html',
  styleUrls: ['./receipt-item.component.scss'],
})
export class ReceiptItemComponent implements OnInit {

  @Input() name: string;
  @Input() type: string;
  @Input() amount: number;
  @Input() date: Date;
  @Input() image: string;
  @Input() imageTaken: Date;

  constructor() { }

  ngOnInit() {}

}
