import { Injectable } from '@angular/core';
import { Owner } from '../model/owner';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  // REST API base URL
    private baseUrl = 'http://localhost:8080/owner';
    ///private baseUrl = 'https://rsbusinesstech-backend.onrender.com/owner';
  
    // Agent-aware cache: agentId -> Owner[]
    private ownerCache: { [agentId: string]: Owner[] } = {};
  
    constructor(private httpClient: HttpClient) {}
  
    // =========================
    // GET ALL OWNERS
    // =========================
    getAllOwners(agentId: string): Observable<Owner[]> {
  
      if (this.ownerCache[agentId]) {
        return of(this.ownerCache[agentId]);
      }
  
      const apiUrl = `${this.baseUrl}/getAllOwners/${agentId}`;
  
      return this.httpClient.get<Owner[]>(apiUrl).pipe(
        tap((data) => {
          this.ownerCache[agentId] = data;
        })
      );
    }
  
    // =========================
    // GET CACHED OWNERS
    // =========================
    getCachedOwners(agentId: string): Owner[] | null {
      return this.ownerCache[agentId] || null;
    }
  
    // =========================
    // GET OWNER BY ID
    // =========================
    getOwnerById(id: number | string, agentId: string): Observable<Owner> {
  
      // 1️⃣ Check cache first
      if (this.ownerCache[agentId]) {
        const cachedOwner = this.ownerCache[agentId].find(
          c => String(c.id) === String(id)
        );
  
        if (cachedOwner) {
          return of(cachedOwner);
        }
      }
  
      // 2️⃣ Call backend
      const apiUrl = `${this.baseUrl}/getOwnerById/${id}/${agentId}`;
  
      return this.httpClient.get<Owner>(apiUrl).pipe(
        tap((owner) => {
          if (!owner) return;
  
          if (this.ownerCache[agentId]) {
            const index = this.ownerCache[agentId].findIndex(
              c => c.id === owner.id
            );
  
            if (index !== -1) {
              this.ownerCache[agentId][index] = owner;
            } else {
              this.ownerCache[agentId].push(owner);
            }
          } else {
            this.ownerCache[agentId] = [owner];
          }
        })
      );
    }
  
    // =========================
    // ADD OWNER
    // =========================
    addOwner(agentId: string, formData: FormData): Observable<Owner> {
      const apiUrl = `${this.baseUrl}/addOwner`;
  
      return this.httpClient.post<Owner>(apiUrl, formData).pipe(
        tap((savedOwner) => {
          if (this.ownerCache[agentId]) {
            this.ownerCache[agentId].push(savedOwner);
          } else {
            this.ownerCache[agentId] = [savedOwner];
          }
        })
      );
    }
  
    // =========================
    // UPDATE OWNER
    // =========================
    updateOwnerWithImages(
      agentId: string,
      id: number,
      formData: FormData
    ): Observable<Owner> {
      const apiUrl = `${this.baseUrl}/updateOwner?id=${id}`;
  
      return this.httpClient.put<Owner>(apiUrl, formData).pipe(
        tap((updatedOwner) => {
          if (this.ownerCache[agentId]) {
            const index = this.ownerCache[agentId].findIndex(
              c => c.id === id
            );
            if (index !== -1) {
              this.ownerCache[agentId][index] = updatedOwner;
            }
          }
        })
      );
    }
  
    // =========================
    // DELETE OWNER
    // =========================
    deleteOwner(agentId: string, id: number): Observable<string> {
      const apiUrl = `${this.baseUrl}/deleteOwner?id=${id}`;
  
      return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
        tap(() => {
          if (this.ownerCache[agentId]) {
            this.ownerCache[agentId] =
              this.ownerCache[agentId].filter(c => c.id !== id);
          }
        })
      );
    }
  }
