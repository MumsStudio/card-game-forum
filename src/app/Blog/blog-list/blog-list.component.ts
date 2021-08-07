import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Auth/Login/login.service';
import { BlogService } from '../blog.service';

import { Blog } from '../blog.model';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService:BlogService, private authService:LoginService){}

  blogs:Blog[] = [];
  isLoading = false;
  userAuthenticated = false;
  userID!: string;

  totalBlogs = 0;
  blogPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50];

  private blogsSub : Subscription | undefined;
  private authStatusSub: Subscription | undefined;

  ngOnInit(){
    this.isLoading = true;
    this.blogService.getBlogs(this.blogPerPage, this.currentPage);
    this.userID = this.authService.getUserID() as string;
    this.blogService.getBlogUpdatedListener().subscribe((data_retirved: {blogs:Blog[], totalBlogs:number})=>{
      this.isLoading = false;
      this.blogs = data_retirved.blogs;
      this.totalBlogs = data_retirved.totalBlogs;
    });
    this.userAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getLoginStatusListener().subscribe(isAuthenticated=>{
      this.userAuthenticated = isAuthenticated;
      this.userID = this.authService.getUserID() as string;
    });
  }

  ngOnDestroy(){
    if (this.blogsSub) {
      this.blogsSub.unsubscribe();
    }
    if (this.authStatusSub){
      this.authStatusSub.unsubscribe();
    }
  }

  onDeleteBlog(blogId:string){
    this.isLoading = true;
    this.blogService.deleteBlog(blogId).subscribe(()=>{
      this.blogService.getBlogs(this.blogPerPage, this.currentPage);
    }, ()=>{
      this.isLoading = false;
    });
  }

  onChangePage(pageData:PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex+1;
    this.blogPerPage = pageData.pageSize;
    this.blogService.getBlogs(this.blogPerPage, this.currentPage);
  }
}
