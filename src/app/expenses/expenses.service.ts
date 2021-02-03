import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseData } from "../shared/expense.model";

@Injectable({
  providedIn: 'root'
})

export class ExpensesService {
  constructor() { }

  private _expensesSub = new BehaviorSubject<ExpenseData[]>([]);
  private _expenseSub = new BehaviorSubject<ExpenseData>(null);

  private _expenses: ExpenseData[] = [
    {
    title: 'Risk Assessment Course',
    amount: 59.99,
    date: new Date('12/10/20'),
    description: 'One night in London',
    receipts: [{
      name: 'Pizza Express',
      type: 'Food',
      amount: 59.99,
      image: 'https://image.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg',
      date: new Date('12/10/20'),
      imageTaken: new Date('12/10/20 10:30')
    }]
    },
    {
    title: 'Driver Training Course',
    amount: 62.98,
    date: new Date('12/10/20'),
    description: 'One night in London',
    receipts: [
      {
      name: 'Pizza Express',
      type: 'Food',
      amount: 45.99,
      image: 'https://image.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg',
      date: new Date('12/10/20'),
      imageTaken: new Date('12/10/20 10:30')
      },
      {
        name: 'McDonalds',
        type: 'Food',
        amount: 16.99,
        image: 'https://image.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg',
        date: new Date('12/10/20'),
        imageTaken: new Date('12/10/20 10:30')
        },
    ]
    },
]

get expenses() {
  this._expensesSub.next(this._expenses)
  return this._expensesSub.asObservable();
}

getExpense(index) {
  let expense = this._expenses[index];
  this._expenseSub.next(expense);
  return this._expenseSub.asObservable();
}

addNewExpense(newExpense) {
  this._expenses.push(newExpense);
}

deleteExpense(expenseIndex) {
  this._expenses.splice(expenseIndex, 1);
}

addNewReceipt(newReceipt, expenseIndex) {
  //Find the expense receipt array and push the new receipt onto it
  let updateArray = this._expenses[expenseIndex].receipts
  updateArray.push(newReceipt);

  //Get expense total and the new receipt total and add it togehter
  let expenseTotal = this._expenses[expenseIndex].amount;
  let recieptAmount = newReceipt.amount;
  let newTotal = expenseTotal + recieptAmount;
  this._expenses[expenseIndex].amount = newTotal;
}

updateReceipt(updatedReceipt, receiptIndex, expenseIndex) {
  //Get the old receipt amount
  let oldReceipt = {...this._expenses[expenseIndex].receipts[receiptIndex]};
  let oldRecieptAmount = oldReceipt.amount;

  //Find the expense receipts array and replace the old with the new
  let updateArray = this._expenses[expenseIndex].receipts
  updateArray.splice(receiptIndex, 1, updatedReceipt)

  //Get the expense total and the new receipt amount
  let expenseTotal = this._expenses[expenseIndex].amount;
  let newRecieptAmount = updatedReceipt.amount;

  //If the new amount is less, take the difference
  if(oldRecieptAmount > newRecieptAmount) {
    let newTotal = expenseTotal - (oldRecieptAmount - newRecieptAmount);
    this._expenses[expenseIndex].amount = newTotal;
  }

  //If the new amount is more, add the difference
  if(oldRecieptAmount < newRecieptAmount) {
    let newTotal = expenseTotal + (newRecieptAmount - oldRecieptAmount);
    this._expenses[expenseIndex].amount = newTotal;
  }
}

deleteReciept(expenseIndex, receiptIndex) {
  let updateArray = this._expenses[expenseIndex].receipts;

  //Get expense total and the receipt total and remove it
  let expenseTotal = this._expenses[expenseIndex].amount;
  let recieptAmount = updateArray[receiptIndex].amount;
  let newTotal = expenseTotal - recieptAmount;
  this._expenses[expenseIndex].amount = newTotal;

  updateArray.splice(receiptIndex, 1);
}

}


