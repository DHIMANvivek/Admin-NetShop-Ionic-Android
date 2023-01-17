import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPageRoutingModule } from './order-details-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsPage } from './order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule {}
