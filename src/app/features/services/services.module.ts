import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './components/services/services.component';
import { ServicesRoutingModule } from './service-routing.module';
import { WebsiteComponent } from './components/services/website_service/website/website.component';

@NgModule({
  declarations: [ServicesComponent, WebsiteComponent],
  imports: [
    CommonModule,
     ServicesRoutingModule
  ]
})
export class ServicesModule { }
