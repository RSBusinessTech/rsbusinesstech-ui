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
  },
    {
    image: 'assets/images/slideshow4.jpg'
  },
    {
    image: 'assets/images/slideshow5.jpg'
  }
];

selectedImage: string | null = null;
selectedIndex = 0;

openImage(index: number): void {
  this.selectedIndex = index;
  this.selectedImage = this.heroSlides[index].image;
}

nextImage(): void {
  this.selectedIndex =
    (this.selectedIndex + 1) % this.heroSlides.length;

  this.selectedImage =
    this.heroSlides[this.selectedIndex].image;
}

prevImage(): void {
  this.selectedIndex =
    (this.selectedIndex - 1 + this.heroSlides.length) %
    this.heroSlides.length;

  this.selectedImage =
    this.heroSlides[this.selectedIndex].image;
}

closeImage(): void {
  this.selectedImage = null;
}

@HostListener('window:keydown', ['$event'])
handleKeyboard(event: KeyboardEvent) {

  if (!this.selectedImage) return;

  if (event.key === 'ArrowRight') {
    this.nextImage();
  }

  if (event.key === 'ArrowLeft') {
    this.prevImage();
  }

  if (event.key === 'Escape') {
    this.closeImage();
  }

}

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

//  testimonials = [
//     {
//     name: 'LashMap Beauty Studio',
//     country: 'Australia',
//     flag: 'assets/icons/australia.png',
//     whatsapp: '+61450096817',
//     message:
//       'Outstanding service and great attention to detail. Highly recommended for businesses looking for a professional online presence.'
//   },
//   {
//     name: 'Vyen Property Advisor',
//     country: 'Malaysia',
//     flag: 'assets/icons/malaysia.png',
//     whatsapp: '+60162907662',
//     message:
//       'RS BusinessTech delivered exactly what we needed. Professional communication, fast delivery and excellent support throughout the project.'
//   },
//   {
//     name: 'RS SuperMart',
//     country: 'India',
//     flag: 'assets/icons/india.png',
//     whatsapp: '+918284948635',
//     message:
//       'Very satisfied with the website and software solution. Everything was delivered on time and exceeded expectations.'
//   }
//  ];

testimonials = [
  {
    name: 'Ah Seng / Ah Ling',
    designation: 'Founder & Owner',
    company: 'LashMap Beauty Studio',
    country: 'Australia',
    flag: 'assets/icons/australia.png',
    photo: 'assets/images/lashmap.jpg',
    whatsapp: '+61450096817',
    message:
      'Outstanding service and great attention to detail. Highly recommended for businesses looking for a professional online presence.'
  },

  {
    name: 'Viven Chia',
    designation: 'Property Advisor',
    company: 'Vyen Property Advisor',
    country: 'Malaysia',
    flag: 'assets/icons/malaysia.png',
    photo: 'assets/images/viven.jpeg',
    whatsapp: '+60162907662',
    message:
      'RS BusinessTech delivered exactly what we needed. Professional communication, fast delivery and excellent support throughout the project.'
  },

  {
    name: 'Rohit Sharma',
    designation: 'Business Owner',
    company: 'RS SuperMart',
    country: 'India',
    flag: 'assets/icons/india.png',
    photo: 'assets/images/rohit.jpeg',
    whatsapp: '+918284948635',
    message:
      'Very satisfied with the website and software solution. Everything was delivered on time and exceeded expectations.'
  },
    {
    name: 'Ana Ang',
    designation: 'Property Advisor',
    company: 'Ana Ang Property',
    country: 'Malaysia',
    flag: 'assets/icons/malaysia.png',
    photo: 'assets/images/ana.jpg',
    whatsapp: '+60164079644',
    message:
     'RS BusinessTech created a professional and elegant website that perfectly represents my property business. The design, responsiveness, and attention to detail exceeded my expectations. I highly recommend their services.'
  },
   {
    name: 'Sue Malli',
    designation: 'Property Advisor',
    company: '1 Pavilion Square KLCC',
    country: 'Malaysia',
    flag: 'assets/icons/malaysia.png',
    photo: 'assets/images/sue.jpeg',
    whatsapp: '+60123815970',
    message:
     'RS BusinessTech delivered a premium website that perfectly showcases the luxury and prestige of 1 Pavilion Square KLCC. The modern design, smooth user experience, and attention to detail have helped us present the development professionally.'
  },

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

  leftFaqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Most websites are completed within 1-4 weeks depending on complexity.',
    open: false
  },
  {
    question: 'How much does a website or software project cost?',
    answer: 'The cost depends on your requirements, features and project complexity. We offer affordable solutions for startups, SMEs and enterprises. Contact us for a free consultation and custom quotation.',
    open: false
  },
  {
    question: 'Do you provide domain and hosting?',
    answer: 'Yes. We can provide domain registration, hosting setup and ongoing maintenance.',
    open: false
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. All websites are fully responsive and optimized for mobile devices.',
    open: false
  }
 ];

rightFaqs = [
  {
    question: 'Do you provide support after delivery?',
    answer: 'Yes. We provide ongoing support, updates and technical assistance.',
    open: false
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Yes. We can modernize and improve your current website design and performance.',
    open: false
  },
  {
    question: 'Do you develop mobile apps?',
    answer: 'Yes. We develop Android, iOS and cross-platform mobile applications.',
    open: false
  }
];

toggleFaq(faq: any): void {
  faq.open = !faq.open;
}


}
