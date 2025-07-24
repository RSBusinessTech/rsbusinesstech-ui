import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { WebsiteComponent } from './components/services/website_service/website/website.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },                         // Default route
  { path: 'website', component: WebsiteComponent },                   // Generic website
  { path: 'website-india', component: WebsiteComponent },
  { path: 'website-malaysia', component: WebsiteComponent },
  { path: 'website-singapore', component: WebsiteComponent },
  { path: 'website-australia', component: WebsiteComponent },
  { path: 'website-usa', component: WebsiteComponent },
  { path: 'website-uk', component: WebsiteComponent },
  { path: 'website-canada', component: WebsiteComponent },
  { path: 'website-germany', component: WebsiteComponent },
  { path: 'website-france', component: WebsiteComponent },
  { path: 'website-netherlands', component: WebsiteComponent },
  { path: 'website-philippines', component: WebsiteComponent },
  { path: 'website-thailand', component: WebsiteComponent },
  { path: 'website-uae', component: WebsiteComponent },
  { path: 'website-japan', component: WebsiteComponent },
  { path: 'website-south-korea', component: WebsiteComponent },
  { path: 'website-china', component: WebsiteComponent },
  { path: 'website-saudi-arabia', component: WebsiteComponent },
  { path: 'website-brazil', component: WebsiteComponent },
  { path: 'website-south-africa', component: WebsiteComponent },
  { path: 'website-new-zealand', component: WebsiteComponent },
  { path: 'website-other', component: WebsiteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
