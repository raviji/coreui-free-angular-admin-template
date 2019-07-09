import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthuserResolver } from '../user/authuser.resolver';
import { NewUserComponent } from './new-user.component';
import { EditUserComponent } from './edit-user.component';
import { EditUserResolver } from './edit-user.resolver';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {data: AuthuserResolver},
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'profile',
    component: ProfileSettingsComponent,
    resolve: {data : AuthuserResolver},
  },
  {
    path: 'new-user',
    component: NewUserComponent,
    data: {
      title: 'New User'
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
export class DashboardRoutingModule {}
