import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  // URL of REST API
  // private baseUrl = 'http://localhost:8080/property';
  private baseUrl = 'https://rsbusinesstech-backend.onrender.com/property';

  // Agent-aware in-memory cache: agentId_type -> Property[]
  private propertyCache: { [key: string]: Property[] } = {};

  constructor(private httpClient: HttpClient) {}

  // =========================
  // GET PROPERTIES BY TYPE
  // =========================
  getPropertiesByType(type: string, agentId: string): Observable<Property[]> {
    const cacheKey = `${agentId}_${type}`;

    if (this.propertyCache[cacheKey]) {
      return of(this.propertyCache[cacheKey]);
    }

    const apiUrl = `${this.baseUrl}/getPropertyByType?type=${type}&agentId=${agentId}`;

    return this.httpClient.get<Property[]>(apiUrl).pipe(
      tap((data) => {
        this.propertyCache[cacheKey] = data;
      })
    );
  }

  // =========================
  // GET CACHED PROPERTIES
  // =========================
  getCachedProperties(type: string, agentId: string): Property[] | null {
    const cacheKey = `${agentId}_${type}`;
    return this.propertyCache[cacheKey] || null;
  }

  // =========================
  // ADD PROPERTY
  // =========================
  addPropertyByType(type: string, agentId: string, formData: FormData): Observable<Property> {
    const cacheKey = `${agentId}_${type}`;
    const apiUrl = `${this.baseUrl}/addPropertyByType?type=${type}`;

    return this.httpClient.post<Property>(apiUrl, formData).pipe(
      tap((savedProperty) => {
        if (this.propertyCache[cacheKey]) {
          this.propertyCache[cacheKey].push(savedProperty);
        } else {
          this.propertyCache[cacheKey] = [savedProperty];
        }
      })
    );
  }

  // =========================
  // UPDATE PROPERTY
  // =========================
  updatePropertyWithImages(
    type: string,
    agentId: string,
    id: number,
    formData: FormData
  ): Observable<Property> {

    const cacheKey = `${agentId}_${type}`;
    const apiUrl = `${this.baseUrl}/updatePropertyByType?type=${type}&id=${id}`;

    return this.httpClient.put<Property>(apiUrl, formData).pipe(
      tap((updatedProperty) => {
        if (this.propertyCache[cacheKey]) {
          const index = this.propertyCache[cacheKey].findIndex(p => p.id === id);
          if (index !== -1) {
            this.propertyCache[cacheKey][index] = updatedProperty;
          }
        }
      })
    );
  }

  // =========================
  // DELETE PROPERTY
  // =========================
  deletePropertyByType(type: string, agentId: string, id: number): Observable<string> {
    const cacheKey = `${agentId}_${type}`;
    const apiUrl = `${this.baseUrl}/deletePropertyByType?type=${type}&id=${id}`;

    return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
      tap(() => {
        if (this.propertyCache[cacheKey]) {
          this.propertyCache[cacheKey] =
            this.propertyCache[cacheKey].filter(p => p.id !== id);
        }
      })
    );
  }
}

