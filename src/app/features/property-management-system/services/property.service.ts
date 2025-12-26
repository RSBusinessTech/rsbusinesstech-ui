// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Property } from '../model/property';

// @Injectable({
//   providedIn: 'root'
// })
// export class PropertyService {

//   //url of Rest-API to be called to fetch property.
//   private baseUrl = "https://rsbusinesstech-backend.onrender.com/property";
//   // private url = "http://127.0.0.1:8080/property/getPropertyByType";

 
//   //local in-memory cache to store previously fetched properties.
//   // private propertyCache: { [type: string]: Property[] } = {};
//   private propertyCache: { [key: string]: Property[] } = {};


//   //dependency injection of HttpClient(Constrcutor DI).
//   constructor(private httpClient: HttpClient) {}

//   //fetching properties based upon type.
//   getPropertiesByType(type: string, agentId: string): Observable<Property[]> {
//     const cacheKey = `${agentId}_${type}`;

//     if (this.propertyCache[cacheKey]) {
//       return of(this.propertyCache[cacheKey]);
//     }

//     const apiUrl = `${this.baseUrl}/getPropertyByType?type=${type}&agentId=${agentId}`;

//     return this.httpClient.get<Property[]>(apiUrl).pipe(
//       tap((data) => {
//         // save result in cache.
//         this.propertyCache[cacheKey] = data;
//       })
//     );
//   }

//    //fetching current cached properties for a given type.
//    getCachedProperties(type: string, agentId: string): Property[] | null {
//     const cacheKey = `${agentId}_${type}`;
//     return this.propertyCache[cacheKey] || null;
//    }


//   // POST
//   // Explicitly setting response as 'text' becuase by default httpClient expects JSON response from REST API.
//   addPropertyByType(type: string, formData: FormData): Observable<Property> {
//   const apiUrl = `${this.baseUrl}/addPropertyByType?type=${type}`;
//   return this.httpClient.post<Property>(apiUrl, formData).pipe(
//     tap((savedProperty) => {
//       if (this.propertyCache[type]) {
//         this.propertyCache[type].push(savedProperty);
//       }
//     })
//   );
//  }

//   // PUT
//  updatePropertyWithImages(type: string, id: number, formData: FormData): Observable<Property> {
//   const apiUrl = `${this.baseUrl}/updatePropertyByType?type=${type}&id=${id}`;
//   return this.httpClient.put<Property>(apiUrl, formData).pipe(
//     tap((updatedProperty) => {
//       // Preserve your cache logic
//       if (this.propertyCache[type]) {
//         const index = this.propertyCache[type].findIndex(p => p.id === id);
//         if (index !== -1) {
//           this.propertyCache[type][index] = updatedProperty; // <--- not skipped
//         }
//       }
//     })
//   );
// }


//  // DELETE
//  deletePropertyByType(type: string, id: number): Observable<string> {
//   const apiUrl = `${this.baseUrl}/deletePropertyByType?type=${type}&id=${id}`;
//   return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
//     tap((response) => {
//       if (this.propertyCache[type]) {
//         this.propertyCache[type] = this.propertyCache[type].filter(p => p.id !== id);
//       }
//     })
//   );
//  }
// }

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

