import { ReceiptData } from "./receipt.model";

export interface ExpenseData {
  
  title: string,
  amount: number,
  date: Date,
  description: string,
  receipts: ReceiptData[]
   
  }