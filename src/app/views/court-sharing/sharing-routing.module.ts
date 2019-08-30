import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthuserResolver } from '../user/authuser.resolver';
import { SharingComponent } from './sharing.component';
import { GroupDetailsComponent } from './group-details.component';
import { EditGroupResolver } from './edit-group.resolver';

const routes: Routes = [
  {
    path: '',
    component: SharingComponent,
    resolve: {data: AuthuserResolver},
    data: {
      title: 'Sharing'
    },
    children: [
      
    ]
  },
  {
    path: ':id',
    component: GroupDetailsComponent,
    resolve: {data : EditGroupResolver},
    data: {
      title: 'Group Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharingRoutingModule {}
