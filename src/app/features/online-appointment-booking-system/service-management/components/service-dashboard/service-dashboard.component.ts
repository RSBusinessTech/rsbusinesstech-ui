import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';


export interface PeriodicElement {
  serviceId: number;
  name: string;
  description: string;
  detailedDescription: string;
  juniorPrice: string;
  seniorPrice: string;
  duration: string;
  category: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {serviceId: 1, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 2, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 3, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 4, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 5, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 6, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 7, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 8, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 9, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
  {serviceId: 10, name: 'Brow Tinting', description: 'Testing', detailedDescription: 'Detailed Testing', juniorPrice: '24', seniorPrice: '34', duration: '15 min', category: 'Eyebrow Services' },
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

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;  //enabling Pagination.
  }

  editRow(element: PeriodicElement) {
  // Implement your edit logic here
}

deleteRow(element: PeriodicElement) {
  const index = this.dataSource.data.indexOf(element);
  if (index !== -1) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // Refresh the table
  }
}

}
