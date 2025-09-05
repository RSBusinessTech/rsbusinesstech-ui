import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.css']
})
export class DashboardWrapperComponent {
  isSidebarOpen = false;

  // Helper to check desktop width
  get isDesktop() {
    return window.innerWidth >= 768;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isDesktop) {
      this.isSidebarOpen = true;  // Sidebar always open on desktop
    } else {
      this.isSidebarOpen = false; // Sidebar closed by default on mobile
    }
  }

  toggleSidebar() {
    // Allow toggle only on mobile
    if (!this.isDesktop) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  ngOnInit() {
    this.onResize();
  }
}
