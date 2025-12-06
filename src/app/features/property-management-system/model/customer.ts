export class Customer {
  // Basic Identification.
  id: number;
  propertyId: number;
  propertyType: string;
  fullName: string;
  fatherName?: string;
  dateOfBirth?: Date;

  // Contact Information.
  email: string;
  mobileNumber: string;
  alternatePhoneNumber?: string;
  whatsappNumber?: string;

  // Address Details.
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Account / Membership Info.
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
  registrationDate?: Date;  //When mapped with property.

  // Preferences / Other Info.
  preferredContactMethod?: 'Email' | 'Phone' | 'Whatsapp';
  gender: 'Male' | 'Female' | 'Other';
  imageUrl?: string;

  // System Metadata.
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;

  //Rental Details.
  rentalAmount: number;
  advanceRentalDeposit: number;
  utilityDeposit: number;
  stampingFee?: number; // optional, agent may or may not charge
  totalAmountForTenancy: number;
  rentalDurationInMonths?: number; // e.g., 12 for 1 year
  rentalStartDate?: Date;
  rentalDueDate?: Date;
  contractStartDate?: Date;
  contractEndDate?: Date;

  //Buy Details.
  propertyPrice: number;
  stampDutyFee: number;     //any govt/agent fee.
  registrationFee: number;  //legal/documentation charges.
  downPaymentAmount: number;
  monthlyInstallmentAmount: number;
  numberOfInstallments: number;
  purchaseDate?: Date;
  totalAmountPaid: number;
}
