import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
