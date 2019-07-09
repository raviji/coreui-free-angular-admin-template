import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../core/shared.module';
import { AddUserComponent } from './add-user.component';
import { EditUserComponent } from './edit-user.component';
import { EditUserResolver } from './edit-user.resolver';
import { WalletComponent } from '../../wallet/wallet.component';

@NgModule({
  imports: [
    FormsModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ UsersComponent, AddUserComponent, EditUserComponent, WalletComponent ],
  providers: [EditUserResolver]
})

export class UsersModule { }
