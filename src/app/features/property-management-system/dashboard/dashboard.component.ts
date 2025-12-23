import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaseInfo } from '../model/LeaseInfo';
import { PMSDashboardSummary } from '../model/PMSDashboardSummary';
import { PMSDashboardSummaryService } from '../services/pms-dashboard-summary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //  ================= KPIs =================
  totalProperties = 0;
  totalRentalProperties = 0;
  totalSaleProperties = 0;
  totalCommercialProperties = 0;
  totalMm2hProperties = 0;
  totalNewProjects = 0;
  totalTenants = 0;
  totalBuyers = 0;
  totalOwners = 0;

  // ================= LISTS =================
  pendingRentalsThisMonth: LeaseInfo[] = [];
  contractsExpiringThisMonth: LeaseInfo[] = [];
  propertiesRentedThisMonth: LeaseInfo[] = [];
  propertiesSoldThisMonth: LeaseInfo[] = [];

  // ================= CHART =================
  propertyStatusChartLabels: string[] = [
    'Occupied',
    'Vacant',
    'Under Maintenance',
    'Reserved'
  ];

  propertyStatusChartData: any[] = [];
  propertyStatusChartType = 'doughnut';
  propertyStatusChartLegend = true;
  propertyStatusChartOptions = { responsive: true };

  constructor(private router: Router, private pmsDashboardSummaryService: PMSDashboardSummaryService) { }

  ngOnInit() {
     // Automatically navigate to the "dashboard" route in order to fix css issue,no other specific reason.
    this.router.navigate(['dashboard']);
    this.loadDashboardSummary();
  }

  loadDashboardSummary(): void {
    this.pmsDashboardSummaryService.getPMSDashboardSummary().subscribe({
      next: (res: PMSDashboardSummary) => {

        // ================= KPIs =================
        this.totalProperties = res.totalProperties;
        this.totalRentalProperties = res.totalRentalProperties;
        this.totalSaleProperties = res.totalSaleProperties;
        this.totalCommercialProperties = res.totalCommercialProperties;
        this.totalMm2hProperties = res.totalMm2hProperties;
        this.totalNewProjects = res.totalNewProjects;
        this.totalTenants = res.totalTenants;
        this.totalBuyers = res.totalBuyers;
        this.totalOwners = res.totalOwners;

        // ================= LISTS =================
        this.pendingRentalsThisMonth = res.pendingRentalsThisMonth;
        this.contractsExpiringThisMonth = res.contractsExpiringThisMonth;
        this.propertiesRentedThisMonth = res.propertiesRentedThisMonth;
        this.propertiesSoldThisMonth = res.propertiesSoldThisMonth;

        // ================= CHART =================
        this.propertyStatusChartData = [{
          data: [
            res.propertyStatusChart.occupied,
            res.propertyStatusChart.vacant,
            res.propertyStatusChart.underMaintenance,
            res.propertyStatusChart.reserved
          ]
        }];
      },
      error: err => {
        console.error('PMS Dashboard summary API failed', err);
      }
    });
  }

  addProperty(): void {
    this.router.navigate(['propertyManagementSystem/rentalProperties']); // <-- navigate to route
  }

  addTenant(): void {
    this.router.navigate(['propertyManagementSystem/rentalCustomers']); // <-- navigate to route
  }

  addOwner(): void {
    this.router.navigate(['propertyManagementSystem/rentalOwners']); // <-- navigate to route
  }

}
