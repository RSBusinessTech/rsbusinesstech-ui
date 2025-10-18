import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-blog-qr-codes',
  templateUrl: './blog-qr-codes.component.html',
  styleUrls: ['./blog-qr-codes.component.css']
})
export class BlogQrCodesComponent implements OnInit {

 constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Importance of QR Codes in Business | Grow Your Brand');
    this.metaService.addTags([
      { name: 'description', content: 'Learn the importance, benefits, and consequences of not using QR codes in business. Stay ahead with modern marketing tools.' },
      { name: 'keywords', content: 'QR codes, business marketing, digital tools, contactless, QR benefits, QR losses' },
      { name: 'author', content: 'Your Business Name' }
    ]);
  }
}
