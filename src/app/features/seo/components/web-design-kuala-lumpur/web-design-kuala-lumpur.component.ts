import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-web-design-kuala-lumpur',
  templateUrl: './web-design-kuala-lumpur.component.html',
  styleUrls: ['./web-design-kuala-lumpur.component.css']
})
export class WebDesignKualaLumpurComponent implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeoData({
      title: 'Web Design Company in Kuala Lumpur | RS BusinessTech',
      description: 'Professional web design company in Kuala Lumpur offering SEO-friendly, fast and mobile responsive websites.',
      keywords: 'web design Kuala Lumpur, website development KL'
    });
  }
}
