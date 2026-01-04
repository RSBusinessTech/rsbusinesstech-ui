export interface Owner {
  imagePreview?: string | ArrayBuffer | null;
  //Basic Identification
  id?: number;
  propertyId?: number;
  agentId:string;
  propertyType?: string;
  fullName?: string;
  fatherName?: string;
  dateOfBirth?: string;
  ownerID?: string;
  ownerIDType?: string;

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

  editMode?: boolean;
  _backup?: Partial<Owner>;
  selectedImage?: File; 
}
