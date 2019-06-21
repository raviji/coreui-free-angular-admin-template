import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgComponent } from './org.component';
import { UserResolver } from '../user/user.resolver';
import { AddOrgComponent } from './add-org.component';
import { EditOrgComponent } from './edit-org.component';
import { EditOrgResolver } from './edit-org.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrgComponent,
    resolve: {data: UserResolver},
    data: {
      title: 'org'
    }
  },
  {
    path: 'add-org',
    component: AddOrgComponent,
    data: {
      title: 'Add org'
    }
  },
  {
    path: 'edit-org/:id',
    component: EditOrgComponent,
    resolve: {data : EditOrgResolver},
    data: {
      title: 'Edit org'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule {}
