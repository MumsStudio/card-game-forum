import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import {map} from 'rxjs/operators'
import { environment } from "src/environments/environment";

import {BlogEntry } from "./blog.model";

const BackendURL = environment.apiURL+ "/blogs/"

@Injectable({providedIn:"root"})
export class BlogService{
  constructor(private httpClient:HttpClient, private router:Router){}

  private blogs:BlogEntry[] = [];
  private blogUpdated = new Subject<{blogs:BlogEntry[], totalBlogs: number}>();

  getBlogUpdatedListener(){
    return this.blogUpdated.asObservable();
  }

  getBlog(blogId:string){
    return this.httpClient.get<{_id:string, title:string, content:string, creator: string}>("blogs/"+blogId);
  }

  getBlogs(blogPerPage:number, currPage:number){
    const queryParams = `?pageSize=${blogPerPage}&currPage=${currPage}`;
    this.httpClient.get<{message:string, blogs:any, totalBlogs:number}>(BackendURL+queryParams)
    .pipe(map((returnData)=>{
      console.log(returnData.message);
      return { blogs: returnData.blogs.map(blog =>{
        return { id:blog._id, title: blog.title, content: blog.content, creator: blog.creator};
      }), totalBlogs: returnData.totalBlogs}
    }))
    .subscribe((transformedblogData)=>{
      console.log(transformedblogData);
      this.blogs = transformedblogData.blogs;
      this.blogUpdated.next({blogs: [...this.blogs], totalBlogs: transformedblogData.totalBlogs});
    });
  }

  addBlog(blog:BlogEntry){
    console.log(blog);
    this.httpClient.post(BackendURL, blog).subscribe(responseData=>{
      this.router.navigate(["/"]);
    });
  }

  deleteBlog(blogId:string){
    return this.httpClient.delete<{message:string}>(BackendURL+blogId);
  }

}
