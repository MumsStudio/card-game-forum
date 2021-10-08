import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../user.models';

import { UserService } from '../users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userList: UserDetails []= []

  totalUsers = 0;
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers(this.pageSize, this.currentPage);
    this.userService.getUserUpdatedListener().subscribe((data_retirved: {users:UserDetails[], totalUsers:number})=>{
      this.totalUsers = this.totalUsers;
      this.userList = data_retirved.users;
    })
  }

}
