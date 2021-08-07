import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/Login/login.component';
import { RegisterComponent } from './Auth/Regsiteration/register.component';
import { BlogCreateComponent } from './Blog/blog-create/blog-create.component';
import { BlogListComponent } from './Blog/blog-list/blog-list.component';

const routes: Routes = [
  {path: "", component:BlogListComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "createBlog", component:BlogCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
