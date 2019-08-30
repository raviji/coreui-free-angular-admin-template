import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharingRoutingModule } from './sharing-routing.module';
import { SharedModule } from '../../core/shared.module';
import { SharingComponent, AddPeopleComponent } from './sharing.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GroupDetailsComponent, AppShareDataDialogComponent } from './group-details.component';
import { EditGroupResolver } from './edit-group.resolver';
import { CourtSharingComponent } from './court-sharing.component';


@NgModule({
  declarations: [SharingComponent, AddPeopleComponent, GroupDetailsComponent, AppShareDataDialogComponent, CourtSharingComponent ],
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
  entryComponents: [AddPeopleComponent, AppShareDataDialogComponent, CourtSharingComponent],
  providers: [EditGroupResolver]
})

export class SharingModule { }
