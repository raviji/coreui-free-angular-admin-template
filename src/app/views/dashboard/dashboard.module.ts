import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../core/shared.module';
import { NewUserComponent } from './new-user.component';
import { EditUserComponent } from './edit-user.component';
import { EditUserResolver } from './edit-user.resolver';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ DashboardComponent, NewUserComponent, EditUserComponent, ProfileSettingsComponent ],
  providers: [EditUserResolver]
})

export class DashboardModule { }
