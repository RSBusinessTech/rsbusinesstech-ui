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
  // 1. Go to Google Maps.
  // 2. Navigate to your location (or route).
  // 3. Click Share → Embed a map.
  // 4. Copy the URL inside the <iframe> tag.
  location?: string;
  videoURL?: string;

  // Runtime / UI-only fields.
  editMode?: boolean;               // true when row is being edited.
  _backup?: Partial<Property>;      // used to store backup for canceling edits.
  selectedImages?: File[];          // temporary files selected before upload.
}
