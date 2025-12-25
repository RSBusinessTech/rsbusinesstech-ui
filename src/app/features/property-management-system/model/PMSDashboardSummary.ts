import { LeaseInfo } from './LeaseInfo';

export interface PMSDashboardSummary {
  totalProperties: number;

  totalRentalProperties: number;
  totalRentedOutProperties : number;
  totalToBeRentedProperties : number;

  totalSaleProperties: number;
  totalSoldOutProperties : number;
  totalToBeSoldProperties : number;

  totalCommercialProperties: number;
  totalMm2hProperties: number;
  totalNewProjects: number;
  
  totalTenants: number;
  totalBuyers: number;
  totalOwners: number;

  pendingRentalsThisMonth: LeaseInfo[];
  contractsExpiringThisMonth: LeaseInfo[];
  propertiesRentedThisMonth: LeaseInfo[];
  propertiesSoldThisMonth: LeaseInfo[];

  propertyStatusChart: {
    occupied: number;
    vacant: number;
    underMaintenance: number;
    reserved: number;         //Booked already but not yet occupied.
  };
}
