import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

export interface File{
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  // @ViewChild("fileUpload", {static:false}) fileUplaod: ElementRef;

  constructor(private blogService:BlogService) { }

  blogForm!: FormGroup;
  imagePreview:string;

  ngOnInit(): void {

    this.blogForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(2)]}),
      description: new FormControl(null),
      content: new FormControl(null, {validators: [Validators.required]}),
      headerImage: new FormControl(null)
    });
  }

  onSaveBlog(){
    if (this.blogForm.invalid){
      return
    }
    this.blogService.addBlog(this.blogForm.getRawValue());
  }

  onFileUpload(event:Event){
    const inFile = (event.target as HTMLInputElement).files[0];
    this.blogForm.patchValue({image:inFile});
    this.blogForm.get('headerImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload= ()=>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(inFile);
    //console.log(inFile);
    //console.log(this.postForm);
  }

}
