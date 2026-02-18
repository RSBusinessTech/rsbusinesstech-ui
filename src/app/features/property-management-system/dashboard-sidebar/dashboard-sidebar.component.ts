import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {
  @Input() isOpen = true;
  @Output() closeSidebar = new EventEmitter<void>();

  openRental = false;
  openBuy = false;
  openCommercial = false;
  openMm2h = false;
  openNewProjects = false;

    constructor(private authService: AuthService, private router: Router ) { }
  

  close() {
    this.closeSidebar.emit();
  }

  logout() {
    this.authService.logout();                                    // call your logout method.
    this.router.navigate(['/propertyManagementSystem/login']);    // redirect to login page.
    this.closeSidebar.emit();                                    // optionally close the sidebar.
  }
}
