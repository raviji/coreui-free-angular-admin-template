import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthuserResolver } from '../user/authuser.resolver';
import { CourtSharingComponent } from './court-sharing.component';
import { SharingComponent } from './sharing.component';

const routes: Routes = [
  {
    path: '',
    component: SharingComponent,
    resolve: {data: AuthuserResolver},
    data: {
      title: 'Sharing'
    }
  },
/*   {
    path: 'sharing/:id',
    component: DetailsComponent,
    resolve: {data : EditOrgResolver},
    data: {
      title: 'Apps'
    }
  },
  {
    path: 'add-sharing',
    component: AddOrgComponent,
    data: {
      title: 'Add Sharing'
    }
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharingRoutingModule {}
