import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  ngOnInit() {
    this.checkReveal();
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

      if(position < windowHeight - 100){
        el.classList.add('active');
      }

    });

  }

}