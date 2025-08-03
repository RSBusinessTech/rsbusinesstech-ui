import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-website-installment-plan',
  templateUrl: './website-installment-plan.component.html',
  styleUrls: ['./website-installment-plan.component.css']
})
export class WebsiteInstallmentPlanComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
}
