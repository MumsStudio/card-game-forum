import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { UserDetails } from "./user.models";

const BackendURL = environment.apiURL+ "/user/"

@Injectable({providedIn:"root"})
export class UserService{

  constructor (private httpclient: HttpClient){}

  private users:UserDetails[] = [];
  private usersUpdated = new Subject<{users:UserDetails[], totalUsers: number}>();

  getUserUpdatedListener(){
    return this.usersUpdated.asObservable();
  }

  getAllUsers(userPerPage: number, currPage:number){
    let queryParams = new HttpParams();
    queryParams.append("currPage", currPage);
    queryParams.append("pageSize", userPerPage);

    this.httpclient.get<{message:string, users:any, totalUsers:number}>(BackendURL,{params: queryParams}).pipe(
      map(returnData=>{
        console.log(returnData.message);
        return { users: returnData.users.map(user=>{
          return {Uid:user._id, Username: user.username};
        }), totalUsers: returnData.totalUsers}
      })
    )
    .subscribe(transformedData=>{
      console.log(transformedData);
      this.users = transformedData.users;
      this.usersUpdated.next({users: [...this.users], totalUsers: transformedData.totalUsers});
    })
  }
}
