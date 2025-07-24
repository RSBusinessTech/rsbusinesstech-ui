import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { PricingByCountry } from '../pricing-details';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  country = 'other';                                     // default fallback.
  pricing = { basic: '', standard: '', premium: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(seg => seg.path).join('/');
      // Extract country from route like "website-india"
      const matched = path.match(/website-?([a-z]*)/i);
      const key = matched && matched[1] ? matched[1].toLowerCase() : 'malaysia';
      this.country = key;

      this.pricing = PricingByCountry[this.country] || PricingByCountry['malaysia'];
    });
  }
}

