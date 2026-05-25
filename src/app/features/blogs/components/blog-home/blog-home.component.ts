import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.checkReveal();
    }, 100);

  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkReveal();
  }

  checkReveal() {

    const reveals = document.querySelectorAll('.reveal');

    const windowHeight = window.innerHeight;

    reveals.forEach((el: any) => {

      const top = el.getBoundingClientRect().top;

      if (top < windowHeight - 120) {
        el.classList.add('active');
      }

    });

  }

  blogs = [

    {
      category: 'WEBSITES',
      title: 'Why Every Business Needs a Website in 2026',
      summary: 'Discover how a modern website built with Angular 8 and Spring Boot can transform your business and help you reach more customers online.',
      image: 'assets/icons/blog-why-website.jpg',
      url: '/blogs/why-business-needs-website',
      publishDate: 'May 20, 2026',
      readingTime: '6 min read'
    },

    {
      category: 'MOBILE APPS',
      title: 'Role of Mobile Apps in Business',
      summary: 'Learn what’s trending in mobile apps and how your business can benefit from custom apps to boost customer engagement and revenue.',
      image: 'assets/icons/blog-mobile-apps.jpg',
      url: '/blogs/role-mobile-apps',
      publishDate: 'May 18, 2026',
      readingTime: '5 min read'
    },

    {
      category: 'QR CODES',
      title: 'QR Codes for Business Growth',
      summary: 'Creative and strategic ways to use QR codes in your marketing and customer engagement to connect instantly and boost visibility.',
      image: 'assets/icons/blog-qr-codes.jpg',
      url: '/blogs/qr-codes-for-business',
      publishDate: 'May 15, 2026',
      readingTime: '4 min read'
    },

    {
      category: 'SECURITY',
      title: 'Do you have Access & Refresh Token based JWT Authentication Security in your website?',
      summary: 'Learn what is JWT Authentication, why it is needed and what are the benefits of securing your website using JWT Authentication.',
      image: 'assets/icons/Jwt.jpg',
      url: '/blogs/jwt',
      publishDate: 'May 12, 2026',
      readingTime: '8 min read'
    }

  ];

}