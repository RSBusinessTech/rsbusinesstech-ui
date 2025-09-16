import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogWhyWebsiteComponent } from './components/blog-why-website/blog-why-website.component';

@NgModule({
  declarations: [BlogHomeComponent, BlogWhyWebsiteComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule  // <-- add this
  ]
})
export class BlogsModule { }
