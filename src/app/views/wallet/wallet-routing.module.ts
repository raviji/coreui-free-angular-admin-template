import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './wallet.component';
import { UserResolver } from '../user/user.resolver';
import { NewWalletComponent } from './new-wallet.component';
import { EditWalletComponent } from './edit-wallet.component';
import { EditWalletResolver } from './edit-wallet.resolver';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    resolve: {data: UserResolver},
    data: {
      title: 'Wallet'
    }
  },
  {
    path: 'add-wallet',
    component: NewWalletComponent,
    data: {
      title: 'New Wallet'
    }
  },
  {
    path: 'edit-wallet/:id',
    component: EditWalletComponent,
    resolve: {data : EditWalletResolver},
    data: {
      title: 'Edit Wallet'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule {}
