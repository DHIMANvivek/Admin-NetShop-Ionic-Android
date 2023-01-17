import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';
import { ExploreProductsPageRoutingModule } from './explore-products-routing.module';

import { ExploreProductsPage } from './explore-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreProductsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ExploreProductsPage]
})
export class ExploreProductsPageModule {}
