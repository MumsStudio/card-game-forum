import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUsersComponent } from './admin/list-users/list-users.component';

import { LoginComponent } from './Auth/Login/login.component';
import { RegisterComponent } from './Auth/Regsiteration/register.component';
import { BlogCreateComponent } from './Blog/blog-create/blog-create.component';
import { BlogListComponent } from './Blog/blog-list/blog-list.component';

const routes: Routes = [
  {path: "", component:BlogListComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "createBlog", component:BlogCreateComponent},
  {path: "admin", loadChildren: ()=> import ("./admin/admin.module").then(m=>m.AdminModule)},
  {path: "usersList", component: ListUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
