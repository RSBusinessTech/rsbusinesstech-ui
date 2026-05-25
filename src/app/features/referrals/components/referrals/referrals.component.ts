import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // run once on page load
    setTimeout(() => {
      this.checkReveal();
    }, 100);

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