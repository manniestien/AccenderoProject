import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  originalUser: User;
  user: User = null;
  groupUsers: User[] = [];
  editMode: boolean = false;
  invalidGroupUser: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }

      let user = this.userService.getUser(id);
      if (!user) {
        return;
      }

      this.originalUser = user;
      this.editMode = true;
      this.user = JSON.parse(JSON.stringify(user));
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newUser = new User(value.id, value.name, value.email, value.phone, value.imageUrl, value._id);
    if(this.editMode) {
      this.userService.updateUser(this.originalUser, newUser)
    } else {
      this.userService.addUser(newUser);
    }
    this.router.navigate(['/users']);
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  isInvalidUser(newUser: User) {
    if (!newUser) {
      return true;
    }

    if (newUser.id === this.user.id) {
      return true;
    }

    for (let i = 0; i < this.groupUsers.length; i++) {
      if (newUser.id === this.groupUsers[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedUser: User = $event.dragData;
    this.invalidGroupUser = this.isInvalidUser(selectedUser);
    if (this.invalidGroupUser) {
      return;
    }
    this.groupUsers.push(selectedUser);
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx > this.groupUsers.length) {
      return;
    }

    this.groupUsers.splice(idx, 1);
    this.invalidGroupUser = false;
  }

}
