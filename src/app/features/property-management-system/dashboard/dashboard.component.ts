import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value) {
            return '$' + value;  // Add $ symbol on Y axis
          }
        }
      }]
    }
  };

  public barChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [1200, 1500, 1000, 1700, 1900, 2200, 2000], label: 'Revenue' }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
     // Automatically navigate to the "dashboard" route in order to fix css issue,no other specific reason.
    this.router.navigate(['dashboard']);
  }

}
