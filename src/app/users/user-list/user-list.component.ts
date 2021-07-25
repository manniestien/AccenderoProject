import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users!: User[];
  term!: string;
  private subscription!: Subscription;
  constructor(private userService: UserService) {

   }

  ngOnInit() {
    this.populateUsers();
  }

  populateUsers() {
    this.userService.getUsers();
    this.userService.userChangedEvent
      .subscribe(
        (        userss: User[]) => {
          this.users = userss;
          console.log(userss)
        }
      )

    this.subscription = this.userService.userListChangedEvent
    .subscribe(
      (userList: User[]) => {
        this.users = userList;
      }
    )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
