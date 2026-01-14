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
    totalRentalProperties: number;
    totalSaleProperties: number;
    totalCommercialProperties: number;
    totalMm2hProperties: number;     
     totalNewProjects: number;    
  };
}
