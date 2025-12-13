import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PropertyManagementSystemRoutingModule } from './property-management-system-routing.module';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { ChartsModule } from 'ng2-charts';
import { ServiceDashboardComponent } from './service-management/components/service-dashboard/service-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CustomerDashboardComponent } from './customer-management/components/customer-dashboard/customer-dashboard.component';
import { RentalDashboardComponent } from './rental-properties/components/rental-dashboard/rental-dashboard.component';
import { CommercialDashboardComponent } from './commercial-properties/components/commercial-dashboard/commercial-dashboard.component';
import { Mm2hDashboardComponent } from './mm2h-properties/components/mm2h-dashboard/mm2h-dashboard.component';
import { NewProjectsDashboardComponent } from './new-projects-properties/components/new-projects-dashboard/new-projects-dashboard.component';
import { BuyDashboardComponent } from './buy-properties/components/buy-dashboard/buy-dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RentalCustomersComponent } from './rental-properties/components/rental-customers/rental-customers.component';
import { BuyCustomersComponent } from './buy-properties/components/buy-customers/buy-customers.component';
import { CommercialCustomersComponent } from './commercial-properties/components/commercial-customers/commercial-customers.component';
import { Mm2hCustomersComponent } from './mm2h-properties/components/mm2h-customers/mm2h-customers.component';
import { NewProjectsCustomersComponent } from './new-projects-properties/components/new-projects-customers/new-projects-customers.component';
import { NewProjectsOwnersComponent } from './new-projects-properties/components/new-projects-owners/new-projects-owners.component';
import { Mm2hOwnersComponent } from './mm2h-properties/components/mm2h-owners/mm2h-owners.component';
import { CommercialOwnersComponent } from './commercial-properties/components/commercial-owners/commercial-owners.component';
import { BuyOwnersComponent } from './buy-properties/components/buy-owners/buy-owners.component';
import { RentalOwnersComponent } from './rental-properties/components/rental-owners/rental-owners.component';
import { ViewCustomerDashboardComponent } from './person/view-customer-dashboard/view-customer-dashboard.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, DashboardWrapperComponent , DashboardSidebarComponent, ServiceDashboardComponent, CustomerDashboardComponent, RentalDashboardComponent, BuyDashboardComponent, CommercialDashboardComponent, Mm2hDashboardComponent, NewProjectsDashboardComponent, RentalCustomersComponent, BuyCustomersComponent, CommercialCustomersComponent, Mm2hCustomersComponent, NewProjectsCustomersComponent, NewProjectsOwnersComponent, Mm2hOwnersComponent, CommercialOwnersComponent, BuyOwnersComponent, RentalOwnersComponent, ViewCustomerDashboardComponent],
  imports: [
    CommonModule,
    PropertyManagementSystemRoutingModule,
    FormsModule,
    ChartsModule,
    MatTableModule,    // for Data Table.
    MatPaginatorModule, //for Pagination. 
    MatSelectModule,    //for paginator dropdown.
    MatIconModule,
    MatButtonModule,
    MatSortModule,         //for Sorting.
    MatInputModule,         //for filtering
    MatFormFieldModule,     //for filtering
    MatTableExporterModule, //for exporting table data into “.xlsx”, “.csv”, “.json”, “.txt” etc files. 
    MatSnackBarModule       //for Snack.
  ]})
export class PropertyManagementSystemModule { }
