
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // REST API base URL
  // private baseUrl = 'http://localhost:8080/customer';
  private baseUrl = 'https://rsbusinesstech-backend.onrender.com/customer';

  // Agent-aware cache: agentId -> Customer[]
  private customerCache: { [agentId: string]: Customer[] } = {};

  constructor(private httpClient: HttpClient) {}

  // =========================
  // GET ALL CUSTOMERS
  // =========================
  getAllCustomers(agentId: string): Observable<Customer[]> {

    if (this.customerCache[agentId]) {
      return of(this.customerCache[agentId]);
    }

    const apiUrl = `${this.baseUrl}/getAllCustomers/${agentId}`;

    return this.httpClient.get<Customer[]>(apiUrl).pipe(
      tap((data) => {
        this.customerCache[agentId] = data;
      })
    );
  }

  // =========================
  // GET CACHED CUSTOMERS
  // =========================
  getCachedCustomers(agentId: string): Customer[] | null {
    return this.customerCache[agentId] || null;
  }

  // =========================
  // GET CUSTOMER BY ID
  // =========================
  getCustomerById(id: number | string, agentId: string): Observable<Customer> {

    // 1️⃣ Check cache first
    if (this.customerCache[agentId]) {
      const cachedCustomer = this.customerCache[agentId].find(
        c => String(c.id) === String(id)
      );

      if (cachedCustomer) {
        return of(cachedCustomer);
      }
    }

    // 2️⃣ Call backend
    const apiUrl = `${this.baseUrl}/getCustomerById/${id}/${agentId}`;

    return this.httpClient.get<Customer>(apiUrl).pipe(
      tap((customer) => {
        if (!customer) return;

        if (this.customerCache[agentId]) {
          const index = this.customerCache[agentId].findIndex(
            c => c.id === customer.id
          );

          if (index !== -1) {
            this.customerCache[agentId][index] = customer;
          } else {
            this.customerCache[agentId].push(customer);
          }
        } else {
          this.customerCache[agentId] = [customer];
        }
      })
    );
  }

  // =========================
  // ADD CUSTOMER
  // =========================
  addCustomer(agentId: string, formData: FormData): Observable<Customer> {
    const apiUrl = `${this.baseUrl}/addCustomer`;

    return this.httpClient.post<Customer>(apiUrl, formData).pipe(
      tap((savedCustomer) => {
        if (this.customerCache[agentId]) {
          this.customerCache[agentId].push(savedCustomer);
        } else {
          this.customerCache[agentId] = [savedCustomer];
        }
      })
    );
  }

  // =========================
  // UPDATE CUSTOMER
  // =========================
  updateCustomerWithImages(
    agentId: string,
    id: number,
    formData: FormData
  ): Observable<Customer> {

    const apiUrl = `${this.baseUrl}/updateCustomer?id=${id}`;

    return this.httpClient.put<Customer>(apiUrl, formData).pipe(
      tap((updatedCustomer) => {
        if (this.customerCache[agentId]) {
          const index = this.customerCache[agentId].findIndex(
            c => c.id === id
          );
          if (index !== -1) {
            this.customerCache[agentId][index] = updatedCustomer;
          }
        }
      })
    );
  }

  // =========================
  // DELETE CUSTOMER
  // =========================
  deleteCustomer(agentId: string, id: number): Observable<string> {
    const apiUrl = `${this.baseUrl}/deleteCustomer?id=${id}`;

    return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
      tap(() => {
        if (this.customerCache[agentId]) {
          this.customerCache[agentId] =
            this.customerCache[agentId].filter(c => c.id !== id);
        }
      })
    );
  }
}