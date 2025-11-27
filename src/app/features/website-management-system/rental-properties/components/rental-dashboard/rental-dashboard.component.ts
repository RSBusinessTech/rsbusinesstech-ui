import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Property } from '../../../model/property';
import { PropertyService } from '../../../services/property.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rental-dashboard',
  templateUrl: './rental-dashboard.component.html',
  styleUrls: ['./rental-dashboard.component.css']
})
export class RentalDashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'name', 'price', 'address', 'bedrooms', 'bathrooms',
    'carParks', 'furnishing', 'sizeSqft', 'amenities',
    'commonFacilities', 'location', 'actions'
  ];

  dataSource = new MatTableDataSource<Property>([]);

  furnishingOptions: string[] = [
  'Fully Furnished',
  'Partly Furnished',
  'Un-Furnished'
  ];

  amenitiesOptions: string[] = [
    'Private bathroom', 'Family room', 'Flat screen TV', 'Balcony',
    'Air conditioning', 'Kitchen', 'Washing machine', 'Pets allowed',
    'Dining table', 'Microwave oven', 'Sofa', 'High-speed WiFi', '24-hour security'
  ];

  commonFacilitiesOptions: string[] = [
    'Gym', 'Outdoor swimming pool', 'Sauna', 'Terrace',
    'Park', 'Water slide', '24-hour security'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  propertyType = 'rent';  // Default property type, can change dynamically

  constructor(
    private propertyService: PropertyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProperties();

    // Custom filter
    this.dataSource.filterPredicate = (data: Property, filter: string) => {
      const text = filter.trim().toLowerCase();
      let s = '';

      s += `${data.id} ${data.name} ${data.address} ${data.furnishing} ${data.sizeSqft} `;
      if (data.bedrooms) s += data.bedrooms + ' ';
      if (data.bathrooms) s += data.bathrooms + ' ';
      if (data.carParks) s += data.carParks + ' ';
      if (data.location) s += data.location + ' ';
      if (data.amenities) s += data.amenities.join(' ') + ' ';
      if (data.commonFacilities) s += data.commonFacilities.join(' ') + ' ';

      return s.toLowerCase().includes(text);
    };
  }

  // -------------------------
  // LOAD PROPERTIES
  // -------------------------
  loadProperties() {
    this.propertyService.getPropertiesByType(this.propertyType).subscribe({
      next: (data: Property[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error("Failed to fetch properties:", err);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------
  // TABLE CRUD LOGIC
  // -------------------------

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
  if (!element.id || element.id === 0) {
    // New row
    this.saveNewRow(element);
  } else {
    // Existing row, call PUT API
    this.propertyService.updatePropertyByType(this.propertyType, element, element.id).subscribe({
      next: (response) => {
        // Show success snackbar
        this.snackBar.open(response, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadProperties(); // reload to refresh table
      },
      error: (err) => {
        // Show error snackbar
        this.snackBar.open('Failed to update property!', 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
        console.error('Failed to update property:', err);
      }
    });
  }

  element.editMode = false;
  delete element._backup;
  this.dataSource._updateChangeSubscription();
}

saveNewRow(element: Property) {
  this.propertyService.addPropertyByType(this.propertyType, element).subscribe({
    next: (response) => {
      this.snackBar.open(response, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.loadProperties();
    },
    error: (err) => {
      this.snackBar.open('Failed to add property!', 'Close', {
        duration: 6000,
        panelClass: ['error-snackbar']
      });
      console.error(err);
    }
  });
}


  cancelEdit(element: Property) {
    if (element._backup) Object.assign(element, element._backup);
    delete element._backup;
    element.editMode = false;
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: Property) {
  if (!element.id || element.id === 0) {
    // Just remove from table if not yet saved
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
    this.dataSource._updateChangeSubscription();
    return;
  }

  // Call DELETE API
  this.propertyService.deletePropertyByType(this.propertyType, element.id).subscribe({
    next: (response) => {
      // Show success snackbar
      this.snackBar.open(response, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.loadProperties();
    },
    error: (err) => {
      // Show error snackbar
      this.snackBar.open('Failed to delete property!', 'Close', {
        duration: 6000,
        panelClass: ['error-snackbar']
      });
      console.error('Failed to delete property:', err);
    }
  });
}
}
