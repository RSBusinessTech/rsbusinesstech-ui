import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-rental-customers',
  templateUrl: './rental-customers.component.html',
  styleUrls: ['./rental-customers.component.css']
})
export class RentalCustomersComponent implements OnInit {

  displayedColumns: string[] = [
    'id','propertyId','propertyType','fullName','fatherName','dateOfBirth','customerID','customerIDType','email','mobileNumber','alternatePhoneNumber',
    'whatsappNumber','addressLine1','addressLine2','city','state','postalCode','country','accountStatus','registrationDate','preferredContactMethod','gender',
    'rentalAmount','advanceRentalDeposit','utilityDeposit','stampingFee','totalAmountRefundable','totalAmountForTenancy','rentalDurationInMonths','gracePeriodInDays','rentalStartDate',
    'rentalDueDate','contractStartDate','contractEndDate','imageUrl','createdBy','createdAt','updatedBy','updatedAt','actions'
  ];

  dataSource = new MatTableDataSource<Customer>([]);
  customerIDTypeOptions: string[] = ['IC', 'Passport'];
  propertyTypeOptions: string[] = ['Rental', 'Buy', 'Commercial', 'MM2H', 'New Project'];

  agentId: string;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.agentId = this.authService.getUsername() || '';
    this.loadCustomers();

    // Filter predicate
    this.dataSource.filterPredicate = (data: Customer, filter: string) => {
      const text = filter.trim().toLowerCase();
      let s = '';
      s += `${data.id} ${data.fullName} ${data.fatherName} ${data.email} ${data.mobileNumber} ${data.city} ${data.state} ${data.customerID} `;
      return s.toLowerCase().includes(text);
    };
  }

  // -------------------------
  // LOAD CUSTOMERS
  // -------------------------
  loadCustomers() {
    const cached = this.customerService.getCachedCustomers(this.agentId);
    if (cached) {
      this.dataSource.data = cached;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    }

    this.customerService.getAllCustomers(this.agentId).subscribe({
      next: (data: Customer[]) => {
        data.forEach(c => c.imageUrl = c.imageUrl || ''); // ensure imageUrl is string
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error("Failed to fetch customers:", err)
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------
  // ADD / EDIT / CANCEL / DELETE
  // -------------------------
addNewRow() {
  const newRow: Customer = {
    id: 0,
    propertyId: 0,
    propertyType: '',
    fullName: '',
    fatherName: '',
    dateOfBirth: '',
    customerID: '',
    customerIDType: 'IC',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    accountStatus: '',
    registrationDate: '',
    preferredContactMethod: '',
    gender: '',
    rentalAmount: 0,
    advanceRentalDeposit: 0,
    utilityDeposit: 0,
    stampingFee:0,
    totalAmountForTenancy: 0,
    rentalDurationInMonths:0,
    gracePeriodInDays:0,
    rentalStartDate: '',
    rentalDueDate: '',
    contractStartDate: '',
    contractEndDate: '',
    propertyPrice: 0,
    stampDutyFee: 0,
    registrationFee: 0,
    downPaymentAmount: 0,
    monthlyInstallmentAmount: 0,
    numberOfInstallments: 0,
    totalAmountPaid: 0,
    imageUrl: '',
    createdBy: '',
    createdAt: '',
    updatedBy: '',
    updatedAt: '',
    
    selectedImage: undefined,
    editMode: true,
    _backup: {},
    imagePreview: undefined
  };
  this.dataSource.data = [newRow, ...this.dataSource.data];
}


editRow(element: Customer) {
  element._backup = { ...element };
  element.editMode = true;
  // Do NOT clear selectedImage here
}


  cancelEdit(element: Customer) {
    if (element._backup) Object.assign(element, element._backup);
    delete element._backup;
    element.editMode = false;
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: Customer) {
    if (!element.id || element.id === 0) {
      this.dataSource.data = this.dataSource.data.filter(e => e !== element);
      this.dataSource._updateChangeSubscription();
      return;
    }

    this.customerService.deleteCustomer(this.agentId, element.id).subscribe({
      next: (response) => {
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.loadCustomers();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete customer!', 'Close', { duration: 6000 });
        console.error(err);
      }
    });
  }

  // -------------------------
  // IMAGE HANDLING
  // -------------------------
  // onImageSelected(event: any, element: Customer) {
  //   const file: File = event.target.files[0];
  //   if (!file) return;

  //   element.selectedImage = file;

  //   const reader = new FileReader();
  //   reader.onload = (e: any) => element.imageUrl = e.target.result;
  //   reader.readAsDataURL(file);
  // }

removeImage(customer: any, index: number) {
  if (customer.imageUrl && customer.imageUrl.length > index) {
    customer.imageUrl.splice(index, 1);
  }
}


  onImageSelected(event: any, element: Customer) {
  const file: File = event.target.files[0];
  if (!file) return;

  element.selectedImage = file;

  const reader = new FileReader();
  reader.onload = (e: any) => element.imageUrl = e.target.result; // single image
  reader.readAsDataURL(file);
}


  // -------------------------
  // SAVE CUSTOMER
  // -------------------------
  saveRow(element: Customer) {
    const customerToSend = { ...element };
    customerToSend.imageUrl = ''; // clear base64 before sending

    const formData = new FormData();
    formData.append('customer', new Blob([JSON.stringify(customerToSend)], { type: 'application/json' }));

    if (element.selectedImage) {
      formData.append('images', element.selectedImage, element.selectedImage.name);
    }

    const isUpdate = element.id && element.id > 0;
    const saveObservable = isUpdate
      ? this.customerService.updateCustomerWithImages(this.agentId, element.id, formData)
      : this.customerService.addCustomer(this.agentId, formData);

    saveObservable.subscribe({
      next: () => {
        this.snackBar.open(isUpdate ? 'Customer Updated Successfully!' : 'Customer Added Successfully!', 'Close', { duration: 3000 });
        this.loadCustomers();
        element.editMode = false;
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to save customer', 'Close', { duration: 4000 });
      }
    });
  }
}
