import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaseInfo } from '../model/LeaseInfo';
import { PMSDashboardSummary } from '../model/PMSDashboardSummary';
import { PMSDashboardSummaryService } from '../services/pms-dashboard-summary.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //  ================= KPIs =================
  totalProperties = 0;

  totalRentalProperties = 0;
  totalRentedOutProperties = 0;
  totalToBeRentedProperties = 0;

  totalSaleProperties = 0;
  totalSoldOutProperties = 0;
  totalToBeSoldProperties = 0;
  
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

  agentId: string;

  constructor(private router: Router, private pmsDashboardSummaryService: PMSDashboardSummaryService, private authService: AuthService) { }

  ngOnInit() {
     // Automatically navigate to the "dashboard" route in order to fix css issue,no other specific reason.
    this.router.navigate(['dashboard']);
    window.scrollTo(0, 0);  //when coming back to dashboard from other UIs, it was scrolling/showing Property status instad of scroll to top, forced to scroll to top.
    this.agentId = this.authService.getUsername() || '';
    this.loadDashboardSummary(this.agentId);
  }

  loadDashboardSummary(agentId: string): void {
    this.pmsDashboardSummaryService.getPMSDashboardSummary(agentId).subscribe({
      next: (res: PMSDashboardSummary) => {
        // ================= KPIs =================
        this.totalProperties = res.totalProperties;

        this.totalRentalProperties = res.totalRentalProperties;
        this.totalRentedOutProperties = res.totalRentedOutProperties;
        this.totalToBeRentedProperties = res.totalToBeRentedProperties;

        this.totalSaleProperties = res.totalSaleProperties;
        this.totalSoldOutProperties = res.totalSoldOutProperties;
        this.totalToBeSoldProperties = res.totalToBeSoldProperties;

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
