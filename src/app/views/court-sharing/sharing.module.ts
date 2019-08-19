import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharingRoutingModule } from './sharing-routing.module';
import { SharedModule } from '../../core/shared.module';
import { CourtSharingComponent } from './court-sharing.component';
import { SharingComponent, AddPeopleComponent } from './sharing.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [SharingComponent, AddPeopleComponent ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,
    SelectAutocompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AddPeopleComponent],
  providers: []
})

export class SharingModule { }
