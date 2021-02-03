import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { InformationPage } from './information.page';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
