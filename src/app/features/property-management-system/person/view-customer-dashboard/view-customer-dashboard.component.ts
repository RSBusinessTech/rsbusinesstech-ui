import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import * as html2pdf from 'html2pdf.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-customer-dashboard',
  templateUrl: './view-customer-dashboard.component.html',
  styleUrls: ['./view-customer-dashboard.component.css']
})
export class ViewCustomerDashboardComponent implements OnInit {

  customer: Customer;
  isLoading = true;
  errorMessage: string;

  agentId: string;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.agentId = this.authService.getUsername() || '';
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getCustomer(id,this.agentId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Customer ID not found in URL';
    }
  }

  private getCustomer(id: string, agentId: string): void {
    this.isLoading = true;

    this.customerService.getCustomerById(id,agentId).subscribe(
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
  if (!element) {
    console.error('customerPdf element not found!');
    return;
  }

  element.classList.add('pdf-mode');

  // Save original styles to restore later
  const originalOverflow = element.style.overflow;
  const originalHeight = element.style.height;

  element.style.overflow = 'visible';
  element.style.height = 'auto';

  const options = {
    margin: [30, 10, 10, 10],
    filename: `Tenant_${this.customer.fullName}.pdf`,
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

  // Generate PDF
  html2pdf()
    .from(element)
    .set(options)
    .toPdf()
    .get('pdf')
    .then((pdf) => {
      // Add header/footer.
      this.addFirstPageHeader(pdf);
      this.addHeaderFooter(pdf);
    })
    .save()
    .then(() => {
      // Restore original UI styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
    })
    .finally(() => {
      // Remove pdf-mode class
      element.classList.remove('pdf-mode');
    });
}

// // Add header ONLY on first page
// private addFirstPageHeader(doc: any) {
//   const pageWidth = doc.internal.pageSize.getWidth();

//   doc.setPage(1);

//   // Heading text
//   doc.setFontSize(16);
//   doc.setTextColor(255, 255, 255); // white
//   doc.setFont('helvetica', 'bold');
//   doc.text(
//     'Tenant Profie',
//     15,
//     20
//   );

//   // Subtle divider line
//   doc.setDrawColor(200);
//   doc.setLineWidth(0.5);
//   doc.line(
//     15,
//     24,
//     pageWidth - 15,
//     24
//   );

//   // Reset styles
//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(10);
//   doc.setTextColor(0);
// }

private addFirstPageHeader(doc: any) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const headerHeight = 30;  // height of header area

  doc.setPage(1);

  // Draw background rectangle (dark blue, adjust color as needed)
  doc.setFillColor(10, 45, 85); // Dark blue background
  doc.rect(0, 0, pageWidth, headerHeight, 'F'); // filled rect at top

  // Add header text (white, bold)
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255); // white text
  doc.setFont('helvetica', 'bold');
  doc.text('Tenant Profile', 15, 20);

  // Subtle underline (lighter blue line)
  doc.setDrawColor(100, 140, 200); // lighter blue color for line
  doc.setLineWidth(1);
  doc.line(15, headerHeight - 5, pageWidth - 15, headerHeight - 5);

  // Reset to normal font and black color for rest of doc
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0);
}


 // Add header/footer logic (LAST PAGE ONLY)
// private addHeaderFooter(doc: any) {
//   const logoUrl = '/assets/icons/logo-rsbusinesstech.png';
//   const website = 'www.rsbusinesstech.com';

//   const pageCount = doc.internal.getNumberOfPages();
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   const lastPage = pageCount;
//   doc.setPage(lastPage);

//   // ---- Divider line ----
//   doc.setDrawColor(200); // light gray
//   doc.setLineWidth(0.3);
//   doc.line(
//     15,
//     pageHeight - 22,
//     pageWidth - 15,
//     pageHeight - 22
//   );

//   // ---- Logo (left) ----
//   const logoWidth = 60;
//   const logoHeight = 14;
//   doc.addImage(
//     logoUrl,
//     'PNG',
//     15,
//     pageHeight - 20,
//     logoWidth,
//     logoHeight
//   );

//   // ---- Website (center) ----
//   doc.setFontSize(9);
//   doc.setTextColor(120);
//   doc.text(
//     website,
//     pageWidth / 2,
//     pageHeight - 10,
//     { align: 'center' }
//   );

//   // ---- Page number (right) ----
//   doc.text(
//     `Page ${lastPage} of ${pageCount}`,
//     pageWidth - 15,
//     pageHeight - 10,
//     { align: 'right' }
//   );

//   // Reset color
//   doc.setTextColor(0);
//  }
private addHeaderFooter(doc: any) {
  const logoUrl = '/assets/icons/logo-rsbusinesstech.png';
  const website = 'www.rsbusinesstech.com';

  const pageCount = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Add page number on every page (right side)
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 15,
      pageHeight - 10,
      { align: 'right' }
    );

    if (i === pageCount) {
      // On last page ONLY: add logo, website, and divider line
      doc.setDrawColor(200); // light gray
      doc.setLineWidth(0.3);
      doc.line(15, pageHeight - 22, pageWidth - 15, pageHeight - 22);

      // Add logo (left)
      const logoWidth = 60;
      const logoHeight = 14;
      doc.addImage(
        logoUrl,
        'PNG',
        15,
        pageHeight - 20,
        logoWidth,
        logoHeight
      );

      // Website (center)
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        website,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );

      doc.setTextColor(0); // Reset color
    }
  }
}

}
