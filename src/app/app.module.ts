import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required for dropdowns

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './features/clients/clients.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ChartsModule } from 'ng2-charts';
import { WebDesignKualaLumpurComponent } from './features/seo/components/web-design-kuala-lumpur/web-design-kuala-lumpur.component';
import { ViewDetailsComponent } from './features/view-details/view-details.component';
import { SafeUrlPipe } from './features/pipes/safe-url.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ClientsComponent,
    MainLayoutComponent,
    DashboardLayoutComponent,
    WebDesignKualaLumpurComponent,
    ViewDetailsComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // <-- Important!
    AppRoutingModule,
    HttpClientModule,  //HttpClient module.
    ChartsModule, 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,         //registering Interceptors.
      useClass: AuthInterceptor,
      multi: true // <- important!
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
