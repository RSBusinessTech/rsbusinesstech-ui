import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { ReferralsRoutingModule } from './referrals-routing.module';

@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    ReferralsRoutingModule
  ]
})
export class ReferralsModule { }
