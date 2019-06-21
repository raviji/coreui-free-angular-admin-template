import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { SharedModule } from '../../core/shared.module';
import { AddEventComponent } from './add-event.component';
import { EditEventResolver } from './edit-event.resolver';
import { EditEventComponent } from './edit-event.component';

@NgModule({
  imports: [
    FormsModule,
    EventRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ EventComponent, AddEventComponent, EditEventComponent ],
  providers: [EditEventResolver]
})

export class EventModule { }
