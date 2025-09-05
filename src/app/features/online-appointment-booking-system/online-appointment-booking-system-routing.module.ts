import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardWrapperComponent, children: [ { path: 'dashboard', component: DashboardComponent }, ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineAppointmentBookingSystemRoutingModule { }
