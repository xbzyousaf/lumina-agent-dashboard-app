import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk4NWMwMi1mY2MwLTcxMDktYThkNS01Y2I5OTdhNTE3NWUiLCJqdGkiOiIzOGFkYTAyYjBkYmJlNzRjZmQzOGIzYTgyMDVmZTJiNjA4Y2YwYWZmNDI3ZmRkMDJiMDg0ZjY1N2Q0Y2JhN2I0NjAzNmU0NzUyNTNkMDRiOCIsImlhdCI6MTc1Mzg5MDYzMi4wNTM3MTcsIm5iZiI6MTc1Mzg5MDYzMi4wNTM3MjIsImV4cCI6MTc4NTQyNjYzMi4wMzkxNDEsInN1YiI6IjE1MCIsInNjb3BlcyI6W119.aGycS2GKuZOExB9hRr6N1GvtWVJOA_zv4wg5nabOWV23KQORzt9-WerCEGG77XY4sq03JslqLkb82OJCYvD7tuUbTydBQ0plLRQx8uzCCoTvYfDcL2V3o8DDTLX0uaqN0sDExGMYSVdUHP-xCh3QRO6tk6kJRWM3Ts3o93e3wrvXVK5CG98cOmpCAk4sKL75TLQrRFYrQaWfHtV2Wbx02ajn_gnGG09KYIj_c6iLWqva1vp9o1YX64U1G6Lz4eH2i7AQAZo4H6gpmjfMV24gxAlHGO4PrvwNdord8vGx-paY-AMFHSWUjxInPMhLYG4mV0-fUb_3aXj4SsKSWY4AGr9n65mP-uvAdy1k2sEdLn-j0zHrpQTqoYvpcA53_jfNnAIDjoJFSCPLO9cM5kcqsHAHPs3SMtZKPwbs-xmdh9SD4YP7sukcbteT8jj1TLqnFwKuH3LRmB5DyMAbiGOTnBAUZ3VEyVTDiCYvQeba1xUFNBWKgo3TPDB81i4l5oZq9i55JOQgJH4JaybYwG_6cZR-LRIJBE0XbmZ2VOxNLBE2-HXLfwLZVV2nNIEOJ0wTY-UBSr8NCNuf7AE1jCAXMB_0qAwsoG5H-T2Ju7WORGRgnOZzyuh4477IN2Osoq9NOKoQK95MLfpO7dcnXVK881X2iDUIlAXeHNR1iqCSNEA";
   
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'

        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
