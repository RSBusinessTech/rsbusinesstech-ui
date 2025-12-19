import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import * as html2pdf from 'html2pdf.js';

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

  downloadPdf() {
  const element = document.getElementById('customerPdf');
   element.classList.add('pdf-mode');

  if (!element) {
    console.error('customerPdf element not found!');
    return;
  }
  
 // safe to use element now
  const originalOverflow = element.style.overflow;
  const originalHeight = element.style.height;

  element.style.overflow = 'visible';
  element.style.height = 'auto';  element.style.overflow = 'visible';
  element.style.height = 'auto';

  const options = {
    margin: [10, 10, 10, 10],
    filename: `Customer_${this.customer.fullName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  html2pdf()
    .from(element)
    .set(options)
    .save()
    .then(() => {
      // Restore UI styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
    });

     // remove class after PDF
      setTimeout(() => element.classList.remove('pdf-mode'), 1000);
   }
}
