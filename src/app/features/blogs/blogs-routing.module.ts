import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogWhyWebsiteComponent } from './components/blog-why-website/blog-why-website.component';

const routes: Routes = [
  { path: '', component: BlogHomeComponent },
  { path: 'why-business-needs-website', component: BlogWhyWebsiteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
