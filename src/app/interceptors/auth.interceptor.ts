import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk4NDIwNS0xOTZmLTczN2EtODg0MS1iOWQ2ZWZkNDAwNTgiLCJqdGkiOiI5NTc1Nzk4NmRlMzhhMzMwNDA4M2M4NWI1MDQ5NmJiNTI1NGYwZTFjMmEwYmRiZDQ3MmZmMWVhOGRkNTk1OTAzYjI2MTUyYzUwMzZlODIwMyIsImlhdCI6MTc1MzQ1NDc5MC42OTMyNSwibmJmIjoxNzUzNDU0NzkwLjY5MzI2MSwiZXhwIjoxNzg0OTkwNzkwLjY2Mzk4NSwic3ViIjoiMSIsInNjb3BlcyI6W119.qrpHzyxF-_K35YOWfhsmk_pA7rqL8QMczc_kf2RtGC40cMfVUUfBDCelAldwURxcDKWYgmxIutsnwL5B5FDyNnpcNSBGMguAzdPtI5Jak3dIgYOvSuScJ4CVbdzP76nYuRUVakI3kiCGX8VRqZ5percimB_uCk1aLKWGCQZk8N6vIV3kFLwlVVNk0EKU7fPojCv0WWsMyO0f587xGZTUaOqQORQLz6kl0rYVcLGUPXv5Oo3Qm0gqtsP--kNIV3tR34lW3AGCY4ezTEF3zgiH2tz9xIogsB2KiXNmNAgOr1Q_4pDcha_0SczztlU8WLz3x9iHKImKaM6AQ2xb4SLBzxelOgmCxS5Tviq-cAjcGM10olasjxf0NUwWhpitY9dvy0GXheEsAKj3q8if2JL15h08VWfC9_qSi8CejQI-TjJIQVx9UZkwAJHxpnYmghUp36bkznxiKCymh4kA83swfBYQWp0Hd6ovcPhd7cq5X_m5PMY3yYoD0PAXLb4fM8MAtmnVzJYXmxbOfrJq78bbfwh5uL7cnSYwwYSYd3JhSE2Rx8eD3EHcTtOSGAtJ00VZ4r5vBANxq17GjuqFDm-ucqLr8eORguIi6EpUiQdheAj3LUHP89xw7xjujkkrbas34_aXbnaxrm2hDgvnImBguh_jk5V_r4B0reLjiKXYV2I";
   
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
