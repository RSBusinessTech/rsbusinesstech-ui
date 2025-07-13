import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './components/services/services.component';
import { ServicesRoutingModule } from './service-routing.module';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
     ServicesRoutingModule
  ]
})
export class ServicesModule { }
