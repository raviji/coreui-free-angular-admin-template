import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase.service';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  currentUser: any;
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {
    this.currentUser = firebase.auth().currentUser;

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getUsers()
    .subscribe(result => {
      // console.log(result);
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/dashboard/edit-user/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  rangeChange(event) {
    this.firebaseService.searchUsersByAge(event.value)
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
