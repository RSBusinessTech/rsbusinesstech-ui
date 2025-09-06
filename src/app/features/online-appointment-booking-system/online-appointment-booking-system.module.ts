import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { OnlineAppointmentBookingSystemRoutingModule } from './online-appointment-booking-system-routing.module';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, DashboardWrapperComponent , DashboardSidebarComponent],
  imports: [
    CommonModule,
    OnlineAppointmentBookingSystemRoutingModule,
    FormsModule,  // for template-driven forms in login component
    ChartsModule
  ]})
export class OnlineAppointmentBookingSystemModule { }
