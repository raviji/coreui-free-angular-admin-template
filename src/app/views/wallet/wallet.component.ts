import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../../core/services/wallet.service';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  currentUser: any;
  constructor(
    public walletService: WalletService,
    private router: Router
  ) {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.walletService.getWallets()
    .subscribe(result => {
      console.log(result);
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/wallet/edit-wallet/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.walletService.searchWallets(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  rangeChange(event) {
    this.walletService.searchWalletsByAge(event.value)
    .subscribe(result => {
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    });
  }

  combineLists(a, b) {
    let result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
