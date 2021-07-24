import { isNull } from '@angular/compiler/src/output/output_ast';
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

  originalUser!: User;
  user!: User;
  editMode: boolean = false;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

  }

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
    let newUser = new User('', value.name, value.email, value.phone, value.imageUrl, value._id);
    if(this.editMode === true) {
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

    return false;
  }



}
