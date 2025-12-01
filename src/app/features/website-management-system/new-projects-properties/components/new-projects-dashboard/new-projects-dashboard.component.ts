import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Property } from '../../../model/property';
import { PropertyService } from '../../../services/property.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-projects-dashboard',
  templateUrl: './new-projects-dashboard.component.html',
  styleUrls: ['./new-projects-dashboard.component.css']
})
export class NewProjectsDashboardComponent implements OnInit {

displayedColumns: string[] = [
    'id', 'name', 'price', 'address', 'bedrooms', 'bathrooms',
    'carParks', 'furnishing', 'sizeSqft', 'amenities','commonFacilities',
    'imageUrls', 'location', 'videoURL', 'actions'
  ];

  dataSource = new MatTableDataSource<Property>([]);

  furnishingOptions: string[] = ['Fully Furnished', 'Partly Furnished', 'Un-Furnished'];

  amenitiesOptions: string[] = [
    'Private bathroom', 'Family room', 'Flat screen TV', 'Balcony',
    'Air conditioning', 'Kitchen', 'Washing machine', 'Pets allowed',
    'Dining table', 'Microwave oven', 'Sofa', 'High-speed WiFi', '24-hour security'
  ];

  commonFacilitiesOptions: string[] = ['Gym', 'Outdoor swimming pool', 'Sauna', 'Terrace', 'Park', 'Water slide', '24-hour security'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  propertyType = 'newProjects';

  constructor(
    private propertyService: PropertyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProperties();

    this.dataSource.filterPredicate = (data: Property, filter: string) => {
      const text = filter.trim().toLowerCase();
      let s = '';

      s += `${data.id} ${data.name} ${data.address} ${data.furnishing} ${data.sizeSqft} `;
      if (data.bedrooms) s += data.bedrooms + ' ';
      if (data.bathrooms) s += data.bathrooms + ' ';
      if (data.carParks) s += data.carParks + ' ';
      if (data.location) s += data.location + ' ';
      if (data.videoURL) s += data.videoURL + ' ';
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
        data.forEach(p => p.imageUrls = p.imageUrls || []);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error("Failed to fetch properties:", err)
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------
  // ADD / EDIT / CANCEL / DELETE
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
      videoURL: '',
      editMode: true,
      selectedImages: []
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  editRow(element: Property) {
    element._backup = { ...element };
    element.editMode = true;
    element.selectedImages = [];
  }

  cancelEdit(element: Property) {
    if (element._backup) Object.assign(element, element._backup);
    delete element._backup;
    element.editMode = false;
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: Property) {
    if (!element.id || element.id === 0) {
      this.dataSource.data = this.dataSource.data.filter(e => e !== element);
      this.dataSource._updateChangeSubscription();
      return;
    }

    this.propertyService.deletePropertyByType(this.propertyType, element.id).subscribe({
      next: (response) => {
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.loadProperties();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete property!', 'Close', { duration: 6000 });
        console.error(err);
      }
    });
  }

  // -------------------------
  // IMAGE HANDLING
  // -------------------------
  onImageSelected(event: any, element: Property) {
    const files: FileList = event.target.files;
    if (!element.selectedImages) element.selectedImages = [];
    if (!element.imageUrls) element.imageUrls = [];

    const totalImages = element.selectedImages.length + element.imageUrls.length + files.length;
    if (totalImages > 10) {
      this.snackBar.open("Maximum 10 images allowed!", "Close", { duration: 3000 });
      return;
    }

    Array.from(files).forEach(file => {
      element.selectedImages!.push(file);

      // preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        element.imageUrls!.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(element: Property, index: number) {
    if (element.imageUrls && element.imageUrls.length > index) element.imageUrls.splice(index, 1);
    if (element.selectedImages && element.selectedImages.length > index) element.selectedImages.splice(index, 1);
  }

  // -------------------------
  // SAVE PROPERTY
  // -------------------------
saveRow(element: Property) {

  //Clone property without base64 image URLs.
  const propertyToSend = { ...element };
  propertyToSend.imageUrls = [];  // send empty or existing server URLs only

  const formData = new FormData();

  //Only send clean property JSON.
  formData.append('property', new Blob([JSON.stringify(propertyToSend)], { type: 'application/json' }));

  //Append image files.
  if (element.selectedImages && element.selectedImages.length > 0) {
    element.selectedImages.forEach(file => formData.append('images', file));
  }

  const isUpdate = element.id && element.id > 0;
  const saveObservable = isUpdate
    ? this.propertyService.updatePropertyWithImages(this.propertyType, element.id, formData)
    : this.propertyService.addPropertyByType(this.propertyType, formData);

  saveObservable.subscribe({
    next: () => {
      this.snackBar.open(isUpdate ? 'Property Updated Successfully!' : 'Property Added Successfully!', 'Close', { duration: 3000 });
      this.loadProperties();
      element.editMode = false;
    },
    error: err => {
      console.error(err);
      this.snackBar.open('Failed to save property', 'Close', { duration: 4000 });
    }
  });
 }
}
