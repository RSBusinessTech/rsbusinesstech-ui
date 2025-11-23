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
  private url = "https://rsbusinesstech-backend.onrender.com/property/getPropertyByType";
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

    const apiUrl = `${this.url}?type=${type}`;

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

}
