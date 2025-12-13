import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // URL of REST API.
  private baseUrl = "https://rsbusinesstech-backend.onrender.com/customer";
  // private url = "http://127.0.0.1:8080/customer";

  // In-memory cache to store previously fetched customers.
  private customerCache: Customer[] | null = null;

  constructor(private httpClient: HttpClient) {}

  // Fetch all customers.
  getAllCustomers(): Observable<Customer[]> {
    // Return cached data if available
    if (this.customerCache) {
      return of(this.customerCache);
    }

    const apiUrl = `${this.baseUrl}/getAllCustomers`;
    return this.httpClient.get<Customer[]>(apiUrl).pipe(
      tap((data) => {
        // Save result in cache
        this.customerCache = data;
      })
    );
  }

  // Return cached customers.
  getCachedCustomers(): Customer[] | null {
    return this.customerCache;
  }

  // Fetch customer by ID
getCustomerById(id: number | string): Observable<Customer> {

  // 1️⃣ Try to return from cache first (optional but recommended)
  if (this.customerCache) {
    const cachedCustomer = this.customerCache.find(
      c => String(c.id) === String(id)
    );

    if (cachedCustomer) {
      return of(cachedCustomer);
    }
  }

  // 2️⃣ Call backend API if not found in cache
  const apiUrl = `${this.baseUrl}/getCustomerById/${id}`;

  return this.httpClient.get<Customer>(apiUrl).pipe(
    tap((customer) => {
      // 3️⃣ Update cache with fetched customer
        if (customer) {
          if (this.customerCache) {
            const index = this.customerCache.findIndex(c => c.id === customer.id);
            if (index !== -1) {
              this.customerCache[index] = customer;
            } else {
              this.customerCache.push(customer);
            }
          } else {
            this.customerCache = [customer];
          }
        }
      })
    );
  }

  // Add new customer.
  addCustomer(formData: FormData): Observable<Customer> {
    const apiUrl = `${this.baseUrl}/addCustomer`;
    return this.httpClient.post<Customer>(apiUrl, formData).pipe(
      tap((savedCustomer) => {
        if (this.customerCache) {
          this.customerCache.push(savedCustomer);
        } else {
          this.customerCache = [savedCustomer];
        }
      })
    );
  }

  // Update customer.
  updateCustomerWithImages(id: number, formData: FormData): Observable<Customer> {
    const apiUrl = `${this.baseUrl}/updateCustomer?id=${id}`;
    return this.httpClient.put<Customer>(apiUrl, formData).pipe(
      tap((updatedCustomer) => {
        if (this.customerCache) {
          const index = this.customerCache.findIndex(p => p.id === id);
          if (index !== -1) {
            this.customerCache[index] = updatedCustomer;
          }
        }
      })
    );
  }

  // Delete customer
  deleteCustomer(id: number): Observable<string> {
    const apiUrl = `${this.baseUrl}/deleteCustomer?id=${id}`;
    return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
      tap(() => {
        if (this.customerCache) {
          this.customerCache = this.customerCache.filter(p => p.id !== id);
        }
      })
    );
  }
}
