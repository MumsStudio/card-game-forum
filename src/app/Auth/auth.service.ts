import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

const BackendURL = environment.apiURL+ "/user/"

@Injectable({
  providedIn: 'root',
 })
export class AuthService{
  constructor(private httpClient:HttpClient, private route:Router){}

  userID:string | undefined;
  private token:string | undefined;
  private loginStage: boolean = false;
  private loginStageUpdated = new Subject<boolean>();

  signup(username:string, password:string){
    this.httpClient.post<{message:string}>(BackendURL+"/signup", {username:username, password:password}).subscribe(returnData=>{
      if (returnData){
        console.log(returnData.message);
        //alert("Register successful, please login to proceed");
        this.route.navigate(["/login"]);
      }
      else{
        console.log("SignUp fail");
      }
    });
  }

  getLoginStatusListener(){
    return this.loginStageUpdated.asObservable();
  }

  loginUser(username:string, password:string){
    this.httpClient.post<{token:string, expiresIn:number, userID:string}>(BackendURL+"/login", {username:username, password:password})
    .subscribe(returnData=>{
      const token = returnData.token;
      this.token = token;
      if (token){
        this.userID = returnData.userID;
        this.loginStage = true;
        this.loginStageUpdated.next(true);
        this.route.navigate(["/"]);
      }
    });
  }

  getIsAuth(){
    return this.loginStage;
  }

  getToken(){
    return this.token;
  }

  getUserID(){
    return this.userID;
  }

  logout(){
    this.token = undefined;
    this.userID = undefined;
    this.loginStage = false;
    this.loginStageUpdated.next(false);

    this.route.navigate(["/login"]);
  }

}
