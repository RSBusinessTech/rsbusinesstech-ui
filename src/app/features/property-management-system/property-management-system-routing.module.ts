import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceDashboardComponent } from './service-management/components/service-dashboard/service-dashboard.component';
import { CustomerDashboardComponent } from './customer-management/components/customer-dashboard/customer-dashboard.component';
import { BuyDashboardComponent } from './buy-properties/components/buy-dashboard/buy-dashboard.component';
import { CommercialDashboardComponent } from './commercial-properties/components/commercial-dashboard/commercial-dashboard.component';
import { Mm2hDashboardComponent } from './mm2h-properties/components/mm2h-dashboard/mm2h-dashboard.component';
import { NewProjectsDashboardComponent } from './new-projects-properties/components/new-projects-dashboard/new-projects-dashboard.component';
import { RentalDashboardComponent } from './rental-properties/components/rental-dashboard/rental-dashboard.component';
import { RentalCustomersComponent } from './rental-properties/components/rental-customers/rental-customers.component';
import { BuyCustomersComponent } from './buy-properties/components/buy-customers/buy-customers.component';
import { CommercialCustomersComponent } from './commercial-properties/components/commercial-customers/commercial-customers.component';
import { Mm2hCustomersComponent } from './mm2h-properties/components/mm2h-customers/mm2h-customers.component';
import { NewProjectsCustomersComponent } from './new-projects-properties/components/new-projects-customers/new-projects-customers.component';
import { RentalOwnersComponent } from './rental-properties/components/rental-owners/rental-owners.component';
import { BuyOwnersComponent } from './buy-properties/components/buy-owners/buy-owners.component';
import { CommercialOwnersComponent } from './commercial-properties/components/commercial-owners/commercial-owners.component';
import { Mm2hOwnersComponent } from './mm2h-properties/components/mm2h-owners/mm2h-owners.component';
import { NewProjectsOwnersComponent } from './new-projects-properties/components/new-projects-owners/new-projects-owners.component';
import { ViewCustomerDashboardComponent } from './person/view-customer-dashboard/view-customer-dashboard.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardWrapperComponent, 
    children: [ { path: 'dashboard', component: DashboardComponent },
                { path: 'serviceManagement',  component: ServiceDashboardComponent }, // Add ServiceDashboardComponent here.
                { path: 'customerManagement', component: CustomerDashboardComponent }, // Add CustomerDashboardComponent here.
                { path: 'rentalProperties', component: RentalDashboardComponent }, // Add RentalDashboardComponent here.
                { path: 'rentalCustomers', component: RentalCustomersComponent }, // Add RentalCustomersComponent here.
                { path: 'rentalOwners', component: RentalOwnersComponent }, // Add RentalOwnersComponent here.
                { path: 'buyProperties', component: BuyDashboardComponent }, // Add BuyDashboardComponent here.
                { path: 'buyCustomers', component: BuyCustomersComponent }, // Add RentalCustomersComponent here.
                { path: 'buyOwners', component: BuyOwnersComponent }, // Add RentalOwnersComponent here.
                { path: 'commercialProperties', component: CommercialDashboardComponent }, // Add CommercialDashboardComponent here.
                { path: 'commercialCustomers', component: CommercialCustomersComponent }, // Add CommercialCustomersComponent here.
                { path: 'commercialOwners', component: CommercialOwnersComponent }, // Add CommercialOwnersComponent here.
                { path: 'mm2hProperties', component: Mm2hDashboardComponent },// Add Mm2hDashboardComponent here.
                { path: 'mm2hCustomers', component: Mm2hCustomersComponent }, // Add Mm2hCustomersComponent here.
                { path: 'mm2hOwners', component: Mm2hOwnersComponent }, // Add Mm2hOwnersComponent here.
                { path: 'newProjectsProperties', component: NewProjectsDashboardComponent }, // Add NewProjectsDashboardComponent here.
                { path: 'newProjectsCustomers', component: NewProjectsCustomersComponent }, // Add CommercialCustomersComponent here.
                { path: 'newProjectsOwners', component: NewProjectsOwnersComponent }, // Add CommercialOwnersComponent here.
                { path: 'viewCustomerDetails/:id', component: ViewCustomerDashboardComponent } // Add ViewCustomerDashboardComponent here.             
     ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyManagementSystemRoutingModule { }
