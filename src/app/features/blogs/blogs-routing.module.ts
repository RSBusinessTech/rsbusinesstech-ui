import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogWhyWebsiteComponent } from './components/blog-why-website/blog-why-website.component';
import { BlogRoleMobileAppsComponent } from './components/blog-role-mobile-apps/blog-role-mobile-apps.component';
import { BlogQrCodesComponent } from './components/blog-qr-codes/blog-qr-codes.component';

const routes: Routes = [
  { path: '', component: BlogHomeComponent },
  { path: 'why-business-needs-website', component: BlogWhyWebsiteComponent },
  { path: 'role-mobile-apps', component: BlogRoleMobileAppsComponent },
  { path: 'qr-codes-for-business', component: BlogQrCodesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
