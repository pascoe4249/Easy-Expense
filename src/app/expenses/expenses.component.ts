import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseData } from '../shared/expense.model';
import { ExpensesService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {

  expenses: ExpenseData[];
  
  constructor(
    private router: Router,
    public expenseService: ExpensesService) { }

  ngOnInit() {
    this.expenseService.expenses.subscribe(expensesData => {
      this.expenses = expensesData;
    })

  }

  onInfoClick() {
    this.router.navigateByUrl('info');
  }

  onAddExpense() {
    this.router.navigateByUrl('/expense/new');
    //open new-expense form and add to expenseService array
  }

  onViewExpense(index: number) {
    this.router.navigate(['expense/' + index]);
  }

}
