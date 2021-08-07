import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { LoginService } from "./Login/login.service";

@Injectable()
export class AuthInterceptor{
  constructor(private authService:LoginService){}

  intercept(request:HttpRequest<any>, next:HttpHandler){
    const authToken = this.authService.getToken();
    const authRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
