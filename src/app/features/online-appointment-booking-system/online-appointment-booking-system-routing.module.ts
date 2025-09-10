import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceDashboardComponent } from './service-management/components/service-dashboard/service-dashboard.component';
import { CustomerDashboardComponent } from './customer-management/components/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardWrapperComponent, 
    children: [ { path: 'dashboard', component: DashboardComponent },
                { path: 'serviceManagement',  component: ServiceDashboardComponent }, // Add ServiceDashboardComponent here.
                { path: 'customerManagement', component: CustomerDashboardComponent } // Add CustomerDashboardComponent here.
     ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineAppointmentBookingSystemRoutingModule { }
