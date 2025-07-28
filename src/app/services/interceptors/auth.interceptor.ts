import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk4MTJlNC01ZGYwLTcwY2MtOTIzZi02MTAxOGIyNDFkMWEiLCJqdGkiOiIxYzI5NzFiMDNmZmE5NjY4NmE4MTRhYzgwYThlNjNkODc5MGJiN2QwMjk3YjE2ODVkYTYzODhiMzBmMmI2ZTQyMDQ3ZDA3NDNiOTJlMmQyMiIsImlhdCI6MTc1MzE4MDQwMy45NjkwNDcsIm5iZiI6MTc1MzE4MDQwMy45NjkwNDksImV4cCI6MTc4NDcxNjQwMy42NzQ1MzksInN1YiI6IjExIiwic2NvcGVzIjpbXX0.dylZGvxydTgpuRbLKF-96NfkRBjMrUN65rl_Tb-JALEeugwvVG2mZ5Ix8x3Ku-chO0_zPYF9XMjQbrPfoz8JR4HWZFcg2FmRf1K89_LQ_uYkx5PmW3wAS2sjrYFT2neEPjdgsbnL5uaolWMqT-EZSrUX3-MD7N-2Ds2Fgd9PiosiFCMBYPlV5IF3xTVHZXV97Y7r7LgvXRhC5HKQuQlgkhwkriBqPlCk7eJdILFXKzUMxdWBl4j_DxJdbRmeWTxJtC88SGmWYeCpqgzhjudK1EhaFsKEUSZlZ_Y_YUEs_NsH60zm_nikLsEN93dNn7z7POF2kTQO2wyA1FpGkA4yKfaivbmWLavcY9eDn1ytNWLcWq2OLrTmWKqJ7fecTkKahASM7hSG6FLG5mS9EcvGr0XeN9GIAkkfxUTXVgaBuTVQWralf69bX8O2cSAUooEpqgdnC9zUt-rG_cigcOKfP94V39rgbA3JcDA93R_ovycdxYWl4Dr6iE1khbEo4YLHP6SBDnBpzdsb2AieNb9Va0Fcpm1rSG4x3YS6ktJYo6KxqR501CxCKV9j5y4HG7G_1MrgM54O_9omp5ChrwR7OvFFNkxwaI2MZPODxQIGWAy9ZfDZOYPdTzCOmJaT-qV0_b8nY9bOY950RCa6JQnPGEoWkwE53n5zzAd6kiiCFGY";
   
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
