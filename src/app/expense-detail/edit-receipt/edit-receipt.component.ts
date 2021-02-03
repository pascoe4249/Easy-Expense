import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from 'src/app/expenses/expenses.service';
import { ReceiptData } from 'src/app/shared/receipt.model';
import { take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent implements OnInit {

  form: FormGroup;

  //store the existing expense reciept if any
  expenseId: number;
  receiptId: number;
  isEdit: boolean = false;
  receiptItem: ReceiptData;
  imageTaken;

  // Default form values for the form
  nameValue: string;
  typeValue: string;
  amountValue: number;
  imageValue: string;
  dateValue;

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    //Subscribe to URL
    this.route.params.subscribe(params => {
      this.expenseId = params.id;

      //If trying to make a new reciept
      if(params.receiptId !== 'new') {
        this.receiptId = params.receiptId
      }

      //If editing existing reciept
      if(params.isEdit === 'edit') {
        this.isEdit = true;
        this.expensesService.getExpense(this.expenseId).pipe(
          take(1)
        )
        .subscribe(expense => {
          this.receiptItem = expense.receipts[this.receiptId];
          this.nameValue = this.receiptItem.name;
          this.typeValue = this.receiptItem.type;
          this.amountValue = this.receiptItem.amount;
          this.imageValue = this.receiptItem.image;
          this.dateValue = this.receiptItem.date.toISOString();
          this.imageTaken = this.receiptItem.imageTaken;
        });
      }
    });
    //Form setup
    this.form = new FormGroup({
      name: new FormControl(this.nameValue, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      type: new FormControl(this.typeValue, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      amount: new FormControl(this.amountValue, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date: new FormControl(this.dateValue, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(this.imageValue, {
        validators: [Validators.required]
      })
    });
  }

  onCancel() {
    this.form.reset();
    this.receiptItem = null;
    this.receiptId = null;
    this.router.navigate(['expense/', this.expenseId]);
  }

  onImagePicked(imageData) {
    this.form.patchValue({image: imageData});
  }

  onImageDate(imageDate) {
    this.imageTaken = imageDate;
  }

  onSubmit() {
    // If editing a receipt
    if(this.isEdit) {
      let updatedReceipt: ReceiptData = {
        name: this.form.value.name,
        type: this.form.value.type,
        amount: this.form.value.amount,
        image: this.form.value.image,
        date: new Date(this.form.value.date),
        imageTaken: this.imageTaken
      }
      this.expensesService.updateReceipt(updatedReceipt, this.receiptId, this.expenseId);
      this.form.reset();
      this.router.navigate(['expense/', this.expenseId]);
    }

    // If new receipt
    if(!this.isEdit) {
      let newReceipt: ReceiptData = {
        name: this.form.value.name,
        type: this.form.value.type,
        amount: this.form.value.amount,
        image: this.form.value.image,
        date: new Date(this.form.value.date),
        imageTaken: this.imageTaken
      }
      this.expensesService.addNewReceipt(newReceipt, this.expenseId);
      this.form.reset();
      this.router.navigate(['expense/', this.expenseId]);
    }

  }

  onDelete() {
    this.alertCtrl.create({
      header: 'Caution!',
      message: 'Are you sure you want to delete this receipt?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expensesService.deleteReciept(this.expenseId, this.receiptId);
            this.form.reset();
            this.router.navigate(['expense/', this.expenseId])
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present()
    })
  }

  ionViewDidLeave() {
    this.form.reset();
    this.imageValue = '';
  }

}
