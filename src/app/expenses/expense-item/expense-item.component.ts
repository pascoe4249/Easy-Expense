import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss'],
})
export class ExpenseItemComponent implements OnInit {
  constructor() { }

  ngOnInit() {}

  @Input() title;
  @Input() amount;
  @Input() date;
  @Input() description;

}
