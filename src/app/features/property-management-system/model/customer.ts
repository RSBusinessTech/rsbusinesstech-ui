export interface Customer {
  imagePreview?: string | ArrayBuffer | null;
  //Basic Identification
  id?: number;
  propertyId?: number;
  agentId:string;
  propertyType?: string;
  fullName?: string;
  fatherName?: string;
  dateOfBirth?: string;
  customerID?: string;
  customerIDType?: string;

  //Contact Information
  email?: string;
  mobileNumber?: string;
  alternatePhoneNumber?: string;
  whatsappNumber?: string;

  //Address Details
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;

  //Account / Membership Info
  accountStatus?: string;
  registrationDate?: string;

  //Preferences / Other Info
  preferredContactMethod?: string;  // "Email", "Phone", "Whatsapp"
  gender?: string;                  // "Male", "Female", "Other"
  imageUrl?: string; 
  imagePublicId?: string;

  //System Metadata
  createdBy?: string;
  createdAt?: string;  
  updatedBy?: string;
  updatedAt?: string;   

  //Rental Info.
  rentalAmount?: number;
  advanceRentalDeposit?: number;
  utilityDeposit?: number;
  stampingFee?: number;
  totalAmountForTenancy?: number;
  rentalDurationInMonths?: number;
  gracePeriodInDays?: number;
  rentalStartDate?: string;
  rentalDueDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  isRentalPaid?: string;

  //Buy Info.
  propertyPrice?: number;
  stampDutyFee?: number;
  registrationFee?: number;
  downPaymentAmount?: number;
  monthlyInstallmentAmount?: number;
  numberOfInstallments?: number;
  purchaseDate?: string;
  totalAmountPaid?: number;


  editMode?: boolean;
  _backup?: Partial<Customer>;
  selectedImage?: File; 
}
