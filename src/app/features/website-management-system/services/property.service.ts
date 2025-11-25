import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  //url of Rest-API to be called to fetch property.
  private baseUrl = "https://rsbusinesstech-backend.onrender.com/property";
  // private url = "http://127.0.0.1:8080/property/getPropertyByType";

 
  //local in-memory cache to store previously fetched properties.
  private propertyCache: { [type: string]: Property[] } = {};

  //dependency injection of HttpClient(Constrcutor DI).
  constructor(private httpClient: HttpClient) {}

  //fetching properties based upon type.
  getPropertiesByType(type: string): Observable<Property[]> {

    if (this.propertyCache[type]) {
      return of(this.propertyCache[type]);
    }

    const apiUrl = `${this.baseUrl}/getPropertyByType?type=${type}`;

    return this.httpClient.get<Property[]>(apiUrl).pipe(
      tap((data) => {
        // save result in cache.
        this.propertyCache[type] = data;
      })
    );
  }

  //fetching current cached properties for a given type.
  getCachedProperties(type: string): Property[] | null {
    return this.propertyCache[type] || null;
  }

  // POST
addPropertyByType(type: string, property: Property): Observable<string> {
  const apiUrl = `${this.baseUrl}/addPropertyByType?type=${type}`;
  return this.httpClient.post(apiUrl, property, { responseType: 'text' }).pipe(
    tap((response) => {
      if (this.propertyCache[type]) {
        this.propertyCache[type].push(property);
      }
    })
  );
}

// PUT
updatePropertyByType(type: string, property: Property, id: number): Observable<string> {
  const apiUrl = `${this.baseUrl}/updatePropertyByType?type=${type}&id=${id}`;
  return this.httpClient.put(apiUrl, property, { responseType: 'text' }).pipe(
    tap((response) => {
      if (this.propertyCache[type]) {
        const index = this.propertyCache[type].findIndex(p => p.id === id);
        if (index !== -1) {
          this.propertyCache[type][index] = property;
        }
      }
    })
  );
}

// DELETE
deletePropertyByType(type: string, id: number): Observable<string> {
  const apiUrl = `${this.baseUrl}/deletePropertyByType?type=${type}&id=${id}`;
  return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
    tap((response) => {
      if (this.propertyCache[type]) {
        this.propertyCache[type] = this.propertyCache[type].filter(p => p.id !== id);
      }
    })
  );
}


}
