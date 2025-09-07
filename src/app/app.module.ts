import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required for dropdowns

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './features/clients/clients.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ClientsComponent,
    MainLayoutComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // <-- Important!
    AppRoutingModule,
    HttpClientModule,
    ChartsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
