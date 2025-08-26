import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/online-appointment-booking-system/login/login.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'onlineAppointmentBookingSystem/login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
