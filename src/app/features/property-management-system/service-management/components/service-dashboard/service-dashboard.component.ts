import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';


export interface PeriodicElement {
  serviceId: number | null;  // changed to allow null for new rows
  name: string;
  description: string;
  detailedDescription: string;
  juniorPrice: string;
  seniorPrice: string;
  duration: string;
  category: string;

  // Optional properties for edit state and backup
  editMode?: boolean;
  _backup?: Partial<PeriodicElement>;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {serviceId: 1, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '50 min', category: 'Eyebrow Services' },
  {serviceId: 2, name: 'Brow Sculpt', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '14', seniorPrice: '34', duration: '25 min', category: 'Eyebrow Services' },
  {serviceId: 3, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '34', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 4, name: 'Brow Sculpt & Tint', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '10', seniorPrice: '34', duration: '45 min', category: 'Eyebrow Services' },
  {serviceId: 5, name: 'Lash Tint/Dye', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '15', seniorPrice: '34', duration: '30 min', category: 'Lash & Brow Services' },
  {serviceId: 6, name: 'Lash Lift', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '50', seniorPrice: '34', duration: '20 min', category: 'Lash & Brow Services' },
  {serviceId: 7, name: 'Lash Lift & Brow Laminate', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Lash & Brow Services' },
  {serviceId: 8, name: 'Full Face Waxing', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '60 min', category: 'Waxing Services' },
  {serviceId: 9, name: 'Hair line waxing', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '35', seniorPrice: '34', duration: '90 min', category: 'Waxing Services' },
  {serviceId: 10, name: 'Top Lip Waxing', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '40', seniorPrice: '34', duration: '70 min', category: 'Waxing Services' },
];

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit {
  displayedColumns: string[] = ['serviceId','category',  'name', 'description', 'detailedDescription','juniorPrice', 'seniorPrice', 'duration', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  

 @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator; //Pagination.
 @ViewChild(MatSort,{static: true}) sort: MatSort;  //Sorting.

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;  //enabling Pagination.
    this.dataSource.sort = this.sort;  //enabling sorting.
  }

deleteRow(element: PeriodicElement) {
  const index = this.dataSource.data.indexOf(element);
  if (index !== -1) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // Refresh the table
  }
}

//for filteration [angular-material].
applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();  //assigning the value filterValue to "filter" property of datasource.
  }

addNewRow() {
  const newRow: PeriodicElement & { editMode?: boolean } = {
    serviceId: null, // no ID yet, backend will generate
    category: '',
    name: '',
    description: '',
    detailedDescription: '',
    juniorPrice: '',
    seniorPrice: '',
    duration: '',
    editMode: true, // enable edit mode immediately
  };

  // Add new row at the top or bottom (your choice)
  this.dataSource.data = [newRow, ...this.dataSource.data];
 }

 editRow(element: PeriodicElement) {
  element.editMode = true;
  // Optionally save original data for cancel
  element._backup = { ...element };
}

saveRow(element: PeriodicElement) {
  element.editMode = false;
  delete element._backup;
  this.dataSource._updateChangeSubscription(); // Refresh table to show changes
}

  cancelEdit(element: PeriodicElement) {
  // If new row (e.g., serviceId null or 0), remove it completely on cancel
  if (!element.serviceId) {
    this.dataSource.data = this.dataSource.data.filter(item => item !== element);
    this.dataSource._updateChangeSubscription(); // Refresh table
  } else if (element._backup) {
    Object.assign(element, element._backup); // Restore original values
    delete element._backup;
    element.editMode = false;
  } else {
    element.editMode = false;
  }
}

}
