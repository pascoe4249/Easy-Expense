import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditReceiptComponent } from './expense-detail/edit-receipt/edit-receipt.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { InformationPage } from './information/information.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full'
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'expense/new',
    component: NewExpenseComponent
  },
  {
    path: 'expense/:id',
    component: ExpenseDetailComponent
  },
  {
    path: 'expense/:id/receipt/:receiptId/:isEdit',
    component: EditReceiptComponent
  },
  {
    path: 'info',
    component: InformationPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
