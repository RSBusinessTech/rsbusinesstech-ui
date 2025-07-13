import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
  {path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },
  {path: 'services', loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule) },
  { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
