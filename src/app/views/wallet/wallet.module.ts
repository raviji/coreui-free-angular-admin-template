import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { SharedModule } from '../../core/shared.module';
import { NewWalletComponent } from './new-wallet.component';
import { EditWalletComponent } from './edit-wallet.component';
import { EditWalletResolver } from './edit-wallet.resolver';

@NgModule({
  imports: [
    FormsModule,
    WalletRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule
  ],
  declarations: [ WalletComponent, NewWalletComponent, EditWalletComponent ],
  providers: [EditWalletResolver]
})

export class WalletModule { }
