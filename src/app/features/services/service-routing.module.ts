import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { WebsiteComponent } from './components/services/website_service/website/website.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },        // Default route for /services
  { path: 'website', component: WebsiteComponent }   // Route for /services/website
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
