import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PricingByCountry } from '../pricing-details';
import { Location } from '@angular/common';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  pricing: any = {};
  countryKey = '';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const lastSegment = urlSegments[urlSegments.length - 1].path; // e.g., 'website-new-zealand'
      this.countryKey = lastSegment.replace('website-', ''); // gives 'new-zealand'

      // Load correct pricing
      this.pricing = PricingByCountry[this.countryKey] || PricingByCountry['other'];
    });
  }

  goBack() {
  this.location.back();
}
}
