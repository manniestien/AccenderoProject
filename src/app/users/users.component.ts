import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectedContact!: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userSelectedEvent.subscribe((user: User) => {
      this.selectedContact = user;
    })
  }

}
