export interface Property {
  id: number;
  name: string;
  price: number;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  carParks?: number;
  furnishing: string;
  sizeSqft: number;
  amenities: string[];
  commonFacilities: string[];
  imageUrls: string[];
  location?: string;
  videoURL?: string;

  // Runtime / UI-only fields.
  editMode?: boolean;               // true when row is being edited.
  _backup?: Partial<Property>;      // used to store backup for canceling edits.
  selectedImages?: File[];          // temporary files selected before upload.
}
