import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  blogs = [
    {
      title: 'Why Every Business Needs a Website in 2026',
      summary: 'Discover how a modern website built with Angular 8 and Spring Boot can transform your business.',
      image: 'assets/icons/blog-why-website.jpg',
      url: '/blogs/why-business-needs-website'
    },
    {
      title: 'Role of Mobile Apps in Business',
      summary: 'Learn what’s trending in mobile apps and how your business can benefit from custom apps.',
      image: 'assets/icons/blog-mobile-apps.png',
      url: '/blogs/role-mobile-apps'
    },
    {
      title: 'QR Codes for Business Growth',
      summary: 'Creative and strategic ways to use QR codes in your marketing and customer engagement.',
      image: '/assets/icons/blog-qr-codes.jpg',
      url: '/blogs/qr-codes-for-business'
    }
  ];

}
