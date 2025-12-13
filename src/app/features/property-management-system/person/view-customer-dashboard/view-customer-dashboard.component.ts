import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-customer-dashboard',
  templateUrl: './view-customer-dashboard.component.html',
  styleUrls: ['./view-customer-dashboard.component.css']
})
export class ViewCustomerDashboardComponent implements OnInit {

  customer: Customer;
  isLoading = true;
  errorMessage: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getCustomer(id);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Customer ID not found in URL';
    }
  }

  private getCustomer(id: string): void {
    this.isLoading = true;

    this.customerService.getCustomerById(id).subscribe(
      (data: Customer) => {
        this.customer = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching customer:', error);
        this.errorMessage = 'Unable to load customer details';
        this.isLoading = false;
      }
    );
  }
}
