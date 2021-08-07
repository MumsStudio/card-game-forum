import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(private blogService:BlogService) { }

  blogForm!: FormGroup;

  ngOnInit(): void {

    this.blogForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(2)]}),
      content: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onSaveBlog(){
    if (this.blogForm.invalid){
      return
    }
    this.blogService.addBlog(this.blogForm.value.title,this.blogForm.value.content);
  }

}
