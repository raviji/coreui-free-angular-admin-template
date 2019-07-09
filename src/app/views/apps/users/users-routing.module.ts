import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AuthuserResolver } from '../../user/authuser.resolver';
import { AddUserComponent } from './add-user.component';
import { EditUserComponent } from './edit-user.component';
import { EditUserResolver } from './edit-user.resolver';
import { WalletComponent } from '../../wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {data: AuthuserResolver},
    data: {
      title: 'Users'
    }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    data: {
      title: 'Add User'
    }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    resolve: {data : EditUserResolver},
    data: {
      title: 'Edit User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
