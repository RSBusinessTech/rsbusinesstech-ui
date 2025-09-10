import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';

export interface PeriodicElement {
  customerId: number | null; // allow null for new rows
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  stylist: string;
  date: string;
  time: string;

  // Optional properties
  editMode?: boolean;
  _backup?: PeriodicElement; // Change from Partial to full PeriodicElement
}

const ELEMENT_DATA: PeriodicElement[] = [
  { customerId: 1, name: 'Rohit', email: 'Rohit@gmail.com', phone: '+601114278964', serviceId: '24', stylist: 'Aseng', date: '17-05-2025', time: '12:00 PM' },
  { customerId: 2, name: 'Joel', email: 'Joel@gmail.com', phone: '601114278964', serviceId: '14', stylist: 'Aling', date: '25-05-2025', time: '2:00 PM' },
  { customerId: 3, name: 'Chris', email: 'Chris@gmail.com', phone: '601114278964', serviceId: '34', stylist: 'Aseng', date: '10-05-2025', time: '3:00 PM' },
  { customerId: 4, name: 'Joe', email: 'Joe@gmail.com', phone: '601114278964', serviceId: '10', stylist: 'Aling', date: '20-05-2025', time: '5:00 PM' },
  { customerId: 5, name: 'Jarrod', email: 'Jarrod@gmail.com', phone: '601114278964', serviceId: '15', stylist: 'Aseng', date: '17-05-2025', time: '4:00 PM' },
  { customerId: 6, name: 'Asif', email: 'Asif@gmail.com', phone: '601114278964', serviceId: '50', stylist: 'Aling', date: '18-05-2025', time: '3:00 PM' },
  { customerId: 7, name: 'Alif', email: 'Alif@gmail.com', phone: '601114278964', serviceId: '24', stylist: 'Aseng', date: '27-05-2025', time: '1:00 PM' },
  { customerId: 8, name: 'Shahrul', email: 'Shahrul@gmail.com', phone: '601114278964', serviceId: '24', stylist: 'Aling', date: '30-05-2025', time: '2:00 PM' },
  { customerId: 9, name: 'Sarah', email: 'Sarah@gmail.com', phone: '601114278964', serviceId: '35', stylist: 'Aseng', date: '20-05-2025', time: '1:00 PM' },
  { customerId: 10, name: 'Barak', email: 'Barak@gmail.com', phone: '601114278964', serviceId: '40', stylist: 'Aling', date: '16-05-2025', time: '2:00 PM' },
];

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  displayedColumns: string[] = ['customerId', 'name', 'email', 'phone', 'serviceId', 'stylist', 'date', 'time', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteRow(element: PeriodicElement) {
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewRow() {
    const newRow: PeriodicElement = {
      customerId: null,
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      stylist: '',
      date: '',
      time: '',
      editMode: true,
      _backup: undefined
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  editRow(element: PeriodicElement) {
    element._backup = { ...element }; // Full backup
    element.editMode = true;
  }

  saveRow(element: PeriodicElement) {
    element.editMode = false;
    delete element._backup;
    this.dataSource._updateChangeSubscription();
  }

  cancelEdit(element: PeriodicElement) {
  // If new row (e.g., customerId null or 0), remove it completely on cancel
  if (!element.customerId) {
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
