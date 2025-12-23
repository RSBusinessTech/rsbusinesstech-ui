import { Injectable } from '@angular/core';
import { PMSDashboardSummary } from '../model/PMSDashboardSummary';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PMSDashboardSummaryService {
  
  private apiUrl = 'https://rsbusinesstech-backend.onrender.com/propertyManagementSystem/getPMSDashboardSummary';

   constructor(private http: HttpClient) { }

   /**
   * Fetches the dashboard summary from backend
   * @returns Observable<DashboardSummary>
   */
  getPMSDashboardSummary(): Observable<PMSDashboardSummary> {
    return this.http.get<PMSDashboardSummary>(this.apiUrl);
  }
}
