import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  editMode?: boolean;
  _backup?: Property;
}

const PROPERTY_DATA: Property[] = [
  {
    id: 1,
    name: 'Property A',
    price: 1200,
    address: '123 Main Street',
    bedrooms: 3,
    bathrooms: 2,
    carParks: 1,
    furnishing: 'Fully furnished',
    sizeSqft: 1200,
    imageUrls: ['https://example.com/image1.jpg'],
    amenities: ['Private bathroom', 'Air conditioning'],
    commonFacilities: ['Gym', 'Park'],
    location: 'Kuala Lumpur'
  },
  {
    id: 2,
    name: 'Property B',
    price: 1500,
    address: '456 Park Avenue',
    bedrooms: 4,
    bathrooms: 3,
    carParks: 2,
    furnishing: 'Semi furnished',
    sizeSqft: 1500,
    imageUrls: ['https://example.com/image2.jpg'],
    amenities: ['Balcony', 'High-speed WiFi'],
    commonFacilities: ['Outdoor swimming pool', '24-hour security'],
    location: 'Petaling Jaya'
  }
];

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'address',
    'bedrooms',
    'bathrooms',
    'carParks',
    'furnishing',
    'sizeSqft',
    'amenities',
    'commonFacilities',
    'location',
    'actions'
  ];

  dataSource = new MatTableDataSource<Property>(PROPERTY_DATA);

  amenitiesOptions: string[] = [
    'Private bathroom',
    'Family room',
    'Flat screen TV',
    'Balcony',
    'Air conditioning',
    'Kitchen',
    'Washing machine',
    'Pets allowed',
    'Dining table',
    'Microwave oven',
    'Sofa',
    'High-speed WiFi',
    '24-hour security'
  ];

  commonFacilitiesOptions: string[] = [
    'Gym',
    'Outdoor swimming pool',
    'Sauna',
    'Terrace',
    'Park',
    'Water slide',
    '24-hour security'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom filter including nested arrays
    this.dataSource.filterPredicate = (data: Property, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      let searchable = '';
      searchable += data.id + ' ';
      searchable += data.name + ' ';
      searchable += data.address + ' ';
      searchable += data.furnishing + ' ';
      searchable += data.sizeSqft + ' ';
      if (data.bedrooms) searchable += data.bedrooms + ' ';
      if (data.bathrooms) searchable += data.bathrooms + ' ';
      if (data.carParks) searchable += data.carParks + ' ';
      if (data.location) searchable += data.location + ' ';
      if (data.amenities) searchable += data.amenities.join(' ') + ' ';
      if (data.commonFacilities) searchable += data.commonFacilities.join(' ') + ' ';
      return searchable.toLowerCase().indexOf(filterValue) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewRow() {
    const newRow: Property = {
      id: 0,
      name: '',
      price: 0,
      address: '',
      furnishing: '',
      sizeSqft: 0,
      imageUrls: [],
      amenities: [],
      commonFacilities: [],
      location: '',
      editMode: true
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  editRow(element: Property) {
    element._backup = { ...element };
    element.editMode = true;
  }

  saveRow(element: Property) {
    element.editMode = false;
    delete element._backup;
    this.dataSource._updateChangeSubscription();
  }

  cancelEdit(element: Property) {
    if (element._backup) Object.assign(element, element._backup);
    delete element._backup;
    element.editMode = false;
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: Property) {
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
    this.dataSource._updateChangeSubscription();
  }

  addImage(element: Property) {
    if (!element.imageUrls) element.imageUrls = [];
    element.imageUrls.push('');
    this.dataSource._updateChangeSubscription();
  }

  removeImage(element: Property, index: number) {
    if (element.imageUrls && element.imageUrls.length > index) {
      element.imageUrls.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }
}
