import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event.component';
import { UserResolver } from '../user/user.resolver';
import { AddEventComponent } from './add-event.component';
import { EditEventComponent } from './edit-event.component';
import { EditEventResolver } from './edit-event.resolver';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    resolve: {data: UserResolver},
    data: {
      title: 'Events'
    }
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    data: {
      title: 'Add event'
    }
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent,
    resolve: {data : EditEventResolver},
    data: {
      title: 'Edit event'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
