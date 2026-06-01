import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroSlides = [
  {
    image: 'assets/images/slideshow1.jpg'
  },

  {
    image: 'assets/images/slideshow2.jpg'
  },

  {
    image: 'assets/images/slideshow3.jpg'
  }
];
currentProject = 0;

projects = [
   {
    title: 'LashMap Beauty Studio',
    category: 'Beauty Industry Website',
    website: 'www.lashmapbeautystudio.com',
    image: 'assets/icons/lashmapbeautystudiohomepage.jpg',
    flag: 'assets/icons/australia.png',
    url: 'https://lashmapbeautystudio.com/home'
  },
  {
    title: 'Vyen Property Advisor',
    category: 'Real Estate Website',
    website: 'www.vyenpropertyadvisor.com',
    image: 'assets/icons/vyenpropertyadvisorhomepage.jpg',
    flag: 'assets/icons/malaysia.png',
    url: 'https://vyenpropertyadvisor.com/home'
  },

  {
    title: 'RS SuperMart',
    category: 'E-Commerce Website',
    website: 'www.rssupermart.com.com',
    image: 'assets/icons/rssupermarthomepage.jpg',
    flag: 'assets/icons/india.png',
    url: 'https://rssupermart.com/home'
  }
 ];

 testimonials = [
    {
    name: 'LashMap Beauty Studio',
    country: 'Australia',
    flag: 'assets/icons/australia.png',
    whatsapp: '+61450096817',
    message:
      'Outstanding service and great attention to detail. Highly recommended for businesses looking for a professional online presence.'
  },
  {
    name: 'Vyen Property Advisor',
    country: 'Malaysia',
    flag: 'assets/icons/malaysia.png',
    whatsapp: '+60162907662',
    message:
      'RS BusinessTech delivered exactly what we needed. Professional communication, fast delivery and excellent support throughout the project.'
  },
  {
    name: 'RS SuperMart',
    country: 'India',
    flag: 'assets/icons/india.png',
    whatsapp: '+918284948635',
    message:
      'Very satisfied with the website and software solution. Everything was delivered on time and exceeded expectations.'
  }
 ];

  goToProject(index: number): void {
   this.currentProject = index;
  }

  goToSlide(index: number): void {
  this.currentSlide = index;
}

 currentSlide = 0;

 ngOnInit() {
  this.checkReveal();
  setInterval(() => {
    this.currentSlide++;
    if (this.currentSlide >= this.heroSlides.length) {
      this.currentSlide = 0;
    }

   }, 4000);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkReveal();
  }

  checkReveal() {

    const elements = document.querySelectorAll('.reveal');

    const windowHeight = window.innerHeight;

    elements.forEach((el: any) => {

      const position = el.getBoundingClientRect().top;

      if (position < windowHeight - 100) {
        el.classList.add('active');
      }

    });

  }


}
