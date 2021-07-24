import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  maxUserId!: number;
  @Output() userSelectedEvent = new EventEmitter<User>();
  @Output() userChangedEvent = new EventEmitter<User[]>();
  @Output() userListChangedEvent = new Subject<User[]>();
  @Output() userListReadyEvent = new Subject<void>();


  constructor(private http: HttpClient) {
    this.getUsers();
   }

   getUsers() {
    this.http.get('http://localhost:3000/users').subscribe(
      //success method
      (users: any) => {
        this.users = users.users;
      },
      //error method
      (error: any) => {
        console.log(error);
      });
      console.log(this.users)
    }

   getUser(id: string) {
     for (let user of this.users) {
       if (user.id === id) {
         return user
       }
     }
     return null;
   }

   getMaxId(): number {
    let maxId: number = 0;
    for (let user of this.users) {
      let currentId: number = +user.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addUser(user: User) {
    if (!user) {
      return;
    }
    // make sure id of the new User is empty
    user.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, user: User }>('http://localhost:3000/users',
      user,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new User to Users
          this.users.push(responseData.user);
        }
      );
  }

  updateUser(originalUser: User, newUser: User) {
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex(d => d.id === originalUser.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new User to the id of the old User
    newUser.id = originalUser.id;
    newUser._id = originalUser._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update in database
    this.http.put('http://localhost:3000/users/' + originalUser.id,
      newUser, { headers: headers })
      .subscribe(
        (response: any) => {
          this.users[pos] = newUser;
        }
      );
  }

  deleteUser(user: User) {

    if (!user) {
      return;
    }

    const pos = this.users.findIndex(d => d.id === user.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/users/' + user.id)
      .subscribe(
        (response: any) => {
          this.users.splice(pos, 1);
        }
      );
  }
}
