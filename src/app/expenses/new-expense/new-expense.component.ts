import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseData } from 'src/app/shared/expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss'],
})
export class NewExpenseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private expensesService: ExpensesService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['expenses']);
    
  }

  onSubmit() {
    let newExpense: ExpenseData = {
      title: this.form.value.title,
      amount: 0.00,
      date: this.form.value.date,
      description: this.form.value.description,
      receipts: []
    }
    this.expensesService.addNewExpense(newExpense);
    this.router.navigate(['expenses']);
  }

}
