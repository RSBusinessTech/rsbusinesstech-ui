import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module'; 
import { ContactComponent } from './components/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './services/contact.service';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule ,
    HttpClientModule           //Http Client module in order to call Rest-APIs.
  ],
  providers: [ContactService]  //Services (Dependency Injection).
})
export class ContactModule { }
