import { Component, HostListener, OnInit } from '@angular/core';
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

    ngOnInit(): void {
    this.checkReveal();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkReveal();
  }

  checkReveal() {

    const reveals =
      document.querySelectorAll('.reveal');

    const windowHeight = window.innerHeight;

    reveals.forEach((el: any) => {

      const top =
        el.getBoundingClientRect().top;

      if (top < windowHeight - 100) {
        el.classList.add('active');
      }

    });
  }

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

    services = [
    {
      number: '01',
      icon: 'fas fa-laptop-code',
      title: 'Website Development',
      description:
        'We build fast, responsive and SEO-friendly websites tailored to your business goals.'
    },
    {
      number: '02',
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Apps Development (Android & iOS)',
      description:
        'High-performance mobile apps for Android & iOS that deliver seamless user experiences.'
    },
    {
      number: '03',
      icon: 'fas fa-cogs',
      title: 'Business Software Solutions',
      description:
        'Custom software solutions to automate processes, improve productivity and drive growth.'
    },
    {
      number: '04',
      icon: 'fas fa-pen-nib',
      title: 'Logo Designing',
      description:
        'Creative and professional logo designs that represent your brand identity.'
    },
    {
      number: '05',
      icon: 'fas fa-qrcode',
      title: 'QR Codes',
      description:
        'Custom QR code solutions for business, marketing, payments and more.'
    },
    {
      number: '06',
      icon: 'fas fa-search',
      title: 'SEO Services',
      description:
        'Boost your online visibility and rank higher on search engines with proven SEO strategies.'
    },
    {
      number: '07',
      icon: 'fas fa-id-card',
      title: 'Business Card Designing',
      description:
        'Professional business card designs that leave a lasting impression.'
    },
    {
      number: '08',
      icon: 'fas fa-headphones',
      title: 'Technical Consultation',
      description:
        'Get expert technical advice to make the right decisions for your business.'
    }
  ];
}
