import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DndModule } from 'ng2-dnd';
import { AppRoutingModule } from './app-routing.module';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { HeaderComponent } from './header.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserEditComponent,
    UserDetailComponent,
    HeaderComponent,
    UserItemComponent,
    UserListComponent,
    UsersComponent,
    AppComponent



  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
