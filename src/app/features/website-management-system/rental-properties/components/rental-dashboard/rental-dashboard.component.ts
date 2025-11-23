import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Property } from '../../../model/property';
import { PropertyService } from '../../../services/property.service';

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

  constructor(private propertyService: PropertyService) {}

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

  // CALL REST API HERE.
  loadProperties() {
    const propertyType = "rent";   // <-- CHANGE IF NEEDED  

    this.propertyService.getPropertiesByType(propertyType).subscribe({
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

  // -------------------------
  // TABLE LOGIC
  // -------------------------

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

    // 🔥 Optional: send UPDATE request to API
    // this.propertyService.updateProperty(element).subscribe()
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

    // Optional: call DELETE API
    // this.propertyService.deleteProperty(element.id).subscribe()
  }
}
