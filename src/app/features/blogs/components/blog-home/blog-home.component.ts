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
    },
    {
      title: 'Do you have Access & Refresh Token based JWT Authentication Security in your website?',
      summary: 'Learn what is JWT Authentication, why is it needed and what are the benefits of securing your website using JWT Authentication.',
      image: '/assets/images/Jwt.png',
      url: '/blogs/jwt',
      metaDescription: 'Step-by-step guide to implement JWT authentication in Spring Boot. Understand access & refresh tokens, secure APIs, and prevent common attacks like XSS and CSRF.',
      keywords: ['JWT Authentication', 'Spring Security', 'Access Token', 'Refresh Token', 'Spring Boot Security', 'REST API Security', 'Token-based Authentication'],
      author: 'RS BusinessTech',
      publishDate: '2026-02-26',
      readingTime: '8 min read',
      socialSnippet: {
        title: 'Secure Spring Boot APIs with JWT Tokens',
        description: 'Discover how to implement access and refresh token based JWT authentication in Spring Boot with code examples and architecture insights.',
        image: '/assets/images/Jwt.png'
     }
   }
  ];
}

/** 
   1. metaDescription & keywords - Good for Google SEO.
   2. socialSnippet - Looks professional when shared on social media.
   3. readingTime & author - Improves user engagement.
   4. summary - Clear, concise, and related to JWT topic.
*/