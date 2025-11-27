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
  imageUrls?: string[];
  amenities?: string[];
  commonFacilities?: string[];
  location?: string;
  videoURL?: string;

   editMode?: boolean;
  _backup?: Property;
}
