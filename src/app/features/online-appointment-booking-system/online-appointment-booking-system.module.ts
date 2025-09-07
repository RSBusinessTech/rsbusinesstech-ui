import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { OnlineAppointmentBookingSystemRoutingModule } from './online-appointment-booking-system-routing.module';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { ChartsModule } from 'ng2-charts';
import { ServiceDashboardComponent } from './service-management/components/service-dashboard/service-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select'; // <-- Add MatSelectModule
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, DashboardWrapperComponent , DashboardSidebarComponent, ServiceDashboardComponent],
  imports: [
    CommonModule,
    OnlineAppointmentBookingSystemRoutingModule,
    FormsModule,  // for template-driven forms in login component
    ChartsModule,
    MatTableModule,    //for Data Table.
    MatPaginatorModule, //for Pagination. 
    MatSelectModule,  // <-- Required for paginator dropdown
    MatIconModule,
    MatButtonModule
  ]})
export class OnlineAppointmentBookingSystemModule { }
