import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    UserEditComponent,
    UserDetailComponent,
    UserListComponent,
    UsersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,  AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
