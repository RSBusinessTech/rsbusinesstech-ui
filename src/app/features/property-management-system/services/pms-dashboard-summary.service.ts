import { Injectable } from '@angular/core';
import { PMSDashboardSummary } from '../model/PMSDashboardSummary';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PMSDashboardSummaryService {

  //private baseUrl = 'http://localhost:8080/propertyManagementSystem';
  private baseUrl = 'https://rsbusinesstech-backend.onrender.com/propertyManagementSystem';

  constructor(private http: HttpClient) {}

  /**
   * Fetch dashboard summary for a specific agent
   */
  getPMSDashboardSummary(agentId: string): Observable<PMSDashboardSummary> {
    const apiUrl = `${this.baseUrl}/getPMSDashboardSummary/${agentId}`;
    return this.http.get<PMSDashboardSummary>(apiUrl);
  }
}
