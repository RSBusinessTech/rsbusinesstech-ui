import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceDashboardComponent } from './service-management/components/service-dashboard/service-dashboard.component';
import { CustomerDashboardComponent } from './customer-management/components/customer-dashboard/customer-dashboard.component';
import { RentalDashboardComponent } from './rental-properties/components/rental-dashboard/rental-dashboard.component';
import { BuyDashboardComponent } from './buy-properties/components/buy-dashboard/buy-dashboard.component';
import { CommercialDashboardComponent } from './commercial-properties/components/commercial-dashboard/commercial-dashboard.component';
import { Mm2hDashboardComponent } from './mm2h-properties/components/mm2h-dashboard/mm2h-dashboard.component';
import { NewProjectsDashboardComponent } from './new-projects-properties/components/new-projects-dashboard/new-projects-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardWrapperComponent, 
    children: [ { path: 'dashboard', component: DashboardComponent },
                { path: 'serviceManagement',  component: ServiceDashboardComponent }, // Add ServiceDashboardComponent here.
                { path: 'customerManagement', component: CustomerDashboardComponent }, // Add CustomerDashboardComponent here.
                { path: 'rentalProperties', component: RentalDashboardComponent }, // Add RentalDashboardComponent here.
                { path: 'buyProperties', component: BuyDashboardComponent }, // Add BuyDashboardComponent here.
                { path: 'commercialProperties', component: CommercialDashboardComponent }, // Add CommercialDashboardComponent here.
                { path: 'mm2hProperties', component: Mm2hDashboardComponent },// Add Mm2hDashboardComponent here.
                { path: 'newProjectsProperties', component: NewProjectsDashboardComponent } // Add NewProjectsDashboardComponent here.
     ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteManagementSystemRoutingModule { }
