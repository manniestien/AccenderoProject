import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/users'},
  {path: 'users', component: UsersComponent, children: [
    {path: 'new', component: UserEditComponent},
    {path: ':id', component: UserDetailComponent},
    {path: ':id/edit', component: UserEditComponent},
  ]},

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
