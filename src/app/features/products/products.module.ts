import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { LoginComponent } from './components/online-appointment-booking-system/login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductsComponent, LoginComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule  // <-- add this
  ]
})
export class ProductsModule { }
