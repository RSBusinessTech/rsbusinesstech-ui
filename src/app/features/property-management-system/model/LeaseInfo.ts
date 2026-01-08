export interface LeaseInfo {
  //Tenant Info
  tenantId?: number;
  tenantName?: string;
  tenantWhatsappNumber?: string;

  //Property Info
  propertyId?: number;
  propertyName?: string;

  //Rental Info
  rentalStartDate?: string;
  rentalAmount?: number

  //Contract Info
  rentalDurationInMonths?: number
  contractStartDate?: string;
  contractEndDate?: string;    
}