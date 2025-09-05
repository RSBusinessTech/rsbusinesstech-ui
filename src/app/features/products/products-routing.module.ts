import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'onlineAppointmentBookingSystem',
    loadChildren: () => import('./components/online-appointment-booking-system/online-appointment-booking-system.module').then(m => m.OnlineAppointmentBookingSystemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
