import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineAppointmentBookingSystemRoutingModule } from './online-appointment-booking-system-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    OnlineAppointmentBookingSystemRoutingModule
  ]
})
export class ProductsModule { }
