import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  showCountrySelector = false;
  selectedService = '';

  countries = [
  { name: 'India', router: 'website-india' },
  { name: 'Malaysia', router: 'website-malaysia' },
  { name: 'Singapore', router: 'website-singapore' },
  { name: 'Australia', router: 'website-australia' },
  { name: 'USA', router: 'website-usa' },
  { name: 'UK', router: 'website-uk' },
  { name: 'Canada', router: 'website-canada' },
  { name: 'Germany', router: 'website-germany' },
  { name: 'France', router: 'website-france' },
  { name: 'Netherlands', router: 'website-netherlands' },
  { name: 'Philippines', router: 'website-philippines' },
  { name: 'Thailand', router: 'website-thailand' },
  { name: 'UAE', router: 'website-uae' },
  { name: 'Japan', router: 'website-japan' },
  { name: 'South Korea', router: 'website-south-korea' },
  { name: 'China', router: 'website-china' },
  { name: 'Saudi Arabia', router: 'website-saudi-arabia' },
  { name: 'Brazil', router: 'website-brazil' },
  { name: 'South Africa', router: 'website-south-africa' },
  { name: 'New Zealand', router: 'website-new-zealand' },
  { name: 'Other', router: 'website-other' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  onServiceClick(service: string) {
    this.selectedService = service;

    if (service === 'website') {
      this.showCountrySelector = true;
    } else {
      this.showCountrySelector = false;               // hide dropdown if previously shown.
       this.router.navigate(['/services', service]);  // navigate to /service/website.
    }
  }

  onCountrySelect(event: Event) {
    const selectedRoute = (event.target as HTMLSelectElement).value;
    if (selectedRoute) {
      this.showCountrySelector = false; // hide dropdown
       this.router.navigate(['/services', selectedRoute]);
    }
  }
}
