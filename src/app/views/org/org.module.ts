import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { OrgComponent } from './org.component';
import { OrgRoutingModule } from './org-routing.module';
import { SharedModule } from '../../core/shared.module';
import { AddOrgComponent } from './add-org.component';
import { EditOrgComponent } from './edit-org.component';
import { EditOrgResolver } from './edit-org.resolver';

@NgModule({
  imports: [
    FormsModule,
    OrgRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ OrgComponent, AddOrgComponent, EditOrgComponent ],
  providers: [EditOrgResolver]
})

export class OrgModule { }
