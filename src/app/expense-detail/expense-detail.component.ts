import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ExpensesService } from '../expenses/expenses.service';
import { ExpenseData } from '../shared/expense.model';
import { ReceiptData } from '../shared/receipt.model';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss'],
})
export class ExpenseDetailComponent implements OnInit {

  expense: ExpenseData;
  expenseId: number;
  receipts: ReceiptData[];
  receiptId: number;

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.expenseId = params.id;
      this.expensesService.getExpense(this.expenseId).subscribe(expense => {
        this.expense = expense;
        this.receipts = expense.receipts;
      });
    });
  }

  onBack() {
    this.router.navigate(['expenses'])
  }

  onAddReceipt() {
    this.router.navigate(['expense/' + this.expenseId + '/receipt/new/new']);
    
  }

  onEditReceipt(receiptIndex) {
    this.router.navigate(['expense/' + this.expenseId + '/receipt/' + receiptIndex +'/edit'])
  }

  onDeleteExpense() {
    this.alertCtrl.create({
      header: 'Caution!',
      message: 'Are you sure you want to delete this expense along with all the receipts?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expensesService.deleteExpense(this.expenseId);
            this.router.navigate(['expenses/']);
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present()
    })
  }

}
