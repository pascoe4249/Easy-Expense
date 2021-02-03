import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseItemComponent } from './expenses/expense-item/expense-item.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { InformationPage } from './information/information.page';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ReceiptItemComponent } from './expense-detail/receipt-item/receipt-item.component';
import { EditReceiptComponent } from './expense-detail/edit-receipt/edit-receipt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePickerComponent } from './expense-detail/edit-receipt/image-picker/image-picker.component';

@NgModule({
  declarations: [
    AppComponent, 
    ExpenseItemComponent, 
    ExpensesComponent, 
    InformationPage,
    ExpenseDetailComponent,
    NewExpenseComponent,
    ReceiptItemComponent,
    EditReceiptComponent,
    ImagePickerComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
