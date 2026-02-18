import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // skip login,refresh endpoints.
    if (
      req.url.includes('/public/login') ||
      req.url.includes('/public/refresh-access-token')
    ) {
      return next.handle(req);
    }

    let authReq = req;
    const token = this.authService.getAccessToken();

    // attach access token if available.
    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(

        switchMap((newToken: string) => {
          this.isRefreshing = false;

          //store new token in subject.
          this.refreshTokenSubject.next(newToken);

          //retry original request with new token.
          return next.handle(this.addTokenHeader(request, newToken));
        }),

        catchError(err => {
          this.isRefreshing = false;

          //refresh token invalid → logout user.
          this.authService.logout();

          return throwError(() => err);
        })
      );

    } else {
      //if refresh already in progress, wait for it.
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token =>
          next.handle(this.addTokenHeader(request, token!))
        )
      );
    }
  }
}
