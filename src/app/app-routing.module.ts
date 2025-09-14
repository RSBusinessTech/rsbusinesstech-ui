import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ClientsComponent } from './features/clients/clients.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  // ✅ All regular routes use MainLayout (header/footer)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
      { path: 'blogs', loadChildren: () => import('./features/blogs/blogs.module').then(m => m.BlogsModule) },
      { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
      { path: 'services', loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule) },
      { path: 'clients', component: ClientsComponent },
      { path: 'referrals', loadChildren: () => import('./features/referrals/referrals.module').then(m => m.ReferralsModule) },
      { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) }
    ]
  },

 {
  path: 'onlineAppointmentBookingSystem',
  component: DashboardLayoutComponent,
  loadChildren: () =>
    import('./features/online-appointment-booking-system/online-appointment-booking-system.module')
      .then(m => m.OnlineAppointmentBookingSystemModule)
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
