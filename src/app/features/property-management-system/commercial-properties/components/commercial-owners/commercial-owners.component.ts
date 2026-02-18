import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OwnerService } from '../../../services/owner.service';
import { Owner } from '../../../model/owner';

@Component({
  selector: 'app-commercial-owners',
  templateUrl: './commercial-owners.component.html',
  styleUrls: ['./commercial-owners.component.css']
})
export class CommercialOwnersComponent implements OnInit {

displayedColumns: string[] = [
    'id','propertyId','propertyType','fullName','fatherName','dateOfBirth','ownerID','ownerIDType','email','mobileNumber','alternatePhoneNumber',
    'whatsappNumber','addressLine1','addressLine2','city','state','postalCode','country','accountStatus','registrationDate','preferredContactMethod','gender',
    'imageUrl','createdBy','createdAt','updatedBy','updatedAt','actions'
  ];

  dataSource = new MatTableDataSource<Owner>([]);
  ownerIDTypeOptions: string[] = ['IC', 'Passport'];
  propertyTypeOptions: string[] = ['Rental', 'Buy', 'Commercial', 'MM2H', 'New Project'];

  agentId: string;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private ownerService: OwnerService,
    private snackBar: MatSnackBar,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.agentId = this.authService.getUsername() || '';
    this.loadOwners();

    // Filter predicate (only for search, Rental type enforced in loadOwners)
    this.dataSource.filterPredicate = (data: Owner, filter: string) => {
      const text = filter.trim().toLowerCase();
      let s = '';
      s += `${data.id} ${data.fullName} ${data.fatherName} ${data.email} ${data.mobileNumber} ${data.city} ${data.state} ${data.ownerID} `;
      return s.toLowerCase().includes(text);
    };
  }

  // -------------------------
  // LOAD OWNERS (ONLY Commercial)
  // -------------------------
  loadOwners() {
    const cached = this.ownerService.getCachedOwners(this.agentId);
    if (cached) {
      const rentalOwners = cached.filter(c => c.propertyType === 'Commercial'); // filter here
      this.dataSource.data = rentalOwners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    }

    this.ownerService.getAllOwners(this.agentId).subscribe({
      next: (data: Owner[]) => {
        const rentalOwners = data.filter(c => c.propertyType === 'Commercial'); // filter here
        rentalOwners.forEach(c => c.imageUrl = c.imageUrl || ''); // ensure imageUrl is string
        this.dataSource.data = rentalOwners;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error("Failed to fetch owners:", err)
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------
  // ADD / EDIT / CANCEL / DELETE
  // -------------------------
  addNewRow() {
    const newRow: Owner = {
      id: 0,
      propertyId: 0,
      agentId: this.agentId,
      propertyType: 'Commercial', // default to Commercial
      fullName: '',
      fatherName: '',
      dateOfBirth: '',
      ownerID: '',
      ownerIDType: 'IC',
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

  editRow(element: Owner) {
    element._backup = { ...element };
    element.editMode = true;
  }

  cancelEdit(element: Owner) {
    if (element._backup) Object.assign(element, element._backup);
    delete element._backup;
    element.editMode = false;
    this.dataSource._updateChangeSubscription();
  }

  deleteRow(element: Owner) {
    if (!element.id || element.id === 0) {
      this.dataSource.data = this.dataSource.data.filter(e => e !== element);
      this.dataSource._updateChangeSubscription();
      return;
    }

    this.ownerService.deleteOwner(this.agentId, element.id).subscribe({
      next: (response) => {
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.loadOwners();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete owner!', 'Close', { duration: 6000 });
        console.error(err);
      }
    });
  }

  // -------------------------
  // IMAGE HANDLING
  // -------------------------
  removeImage(owner: any, index: number) {
    if (owner.imageUrl && owner.imageUrl.length > index) {
      owner.imageUrl.splice(index, 1);
    }
  }

  onImageSelected(event: any, element: Owner) {
    const file: File = event.target.files[0];
    if (!file) return;

    element.selectedImage = file;

    const reader = new FileReader();
    reader.onload = (e: any) => element.imageUrl = e.target.result; // single image
    reader.readAsDataURL(file);
  }

  // -------------------------
  // SAVE OWNER
  // -------------------------
  saveRow(element: Owner) {
    const ownerToSend = { ...element };
    ownerToSend.imageUrl = ''; // clear base64 before sending

    const formData = new FormData();
    formData.append('owner', new Blob([JSON.stringify(ownerToSend)], { type: 'application/json' }));

    if (element.selectedImage) {
      formData.append('images', element.selectedImage, element.selectedImage.name);
    }

    const isUpdate = element.id && element.id > 0;
    const saveObservable = isUpdate
      ? this.ownerService.updateOwnerWithImages(this.agentId, element.id, formData)
      : this.ownerService.addOwner(this.agentId, formData);

    saveObservable.subscribe({
      next: () => {
        this.snackBar.open(isUpdate ? 'Owner Updated Successfully!' : 'Owner Added Successfully!', 'Close', { duration: 3000 });
        this.loadOwners();
        element.editMode = false;
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Failed to save Owner', 'Close', { duration: 4000 });
      }
    });
  }}
