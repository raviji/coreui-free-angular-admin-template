import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { WalletService } from '../../core/services/wallet.service';

@Injectable()
export class EditWalletResolver implements Resolve<any> {

  constructor(public walletService: WalletService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let walletId = route.paramMap.get('id');
      this.walletService.getWallet(walletId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
