import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', 
    component: DashboardWrapperComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // add more child routes here if needed
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineAppointmentBookingSystemRoutingModule { }
