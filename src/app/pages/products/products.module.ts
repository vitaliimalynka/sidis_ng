import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardModule } from 'app/components/product-card/product-card.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductCardModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
