import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-role-mobile-apps',
  templateUrl: './blog-role-mobile-apps.component.html',
  styleUrls: ['./blog-role-mobile-apps.component.css']
})
export class BlogRoleMobileAppsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  contactUs() {
    window.location.href = 'https://wa.me/+601114278964';
  }
}
