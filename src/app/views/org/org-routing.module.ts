import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgComponent } from './org.component';
import { AuthuserResolver } from '../user/authuser.resolver';
import { AddOrgComponent } from './add-org.component';
import { EditOrgResolver } from './edit-org.resolver';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: '',
    component: OrgComponent,
    resolve: {data: AuthuserResolver},
    data: {
      title: 'org'
    }
  },
  {
    path: 'apps/:id',
    component: DetailsComponent,
    resolve: {data : EditOrgResolver},
    data: {
      title: 'Details'
    }
  },
  {
    path: 'add-org',
    component: AddOrgComponent,
    data: {
      title: 'Add org'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule {}
