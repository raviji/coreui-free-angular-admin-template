import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditUserComponent } from './edit-user.component';
import { ConfirmboxComponent } from '../../../core/shared/confirmbox.component';
import { AddUserComponent } from './add-user.component';
import { UsersService } from '../../../core/services/users.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'action'];
  _dataSource: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  currentUser: any;
  currentOrgId: any;
  constructor(
    public _userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public url: Location
  ) {
    this.currentUser = firebase.auth().currentUser;
    // console.log(this.currentUser.uid);
  }

  ngOnInit() {
    let stringToSplit = this.url.path().toString();
    let x = stringToSplit.split('/');
    console.log(x[2]);
    this.currentOrgId = x[2];
    this.getData(x[2]);
  }
  ngAfterViewInit() {
    // this.getData();
  }
  getData(key) {
    this._userService.getOrgUsers(key)
    .subscribe(result => {
      this._dataSource = result;
      console.log(result);
    });
  }

  viewDetails(item) {
    this.router.navigate(['/org/edit-org/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // searchByName() {
  //   let value = this.searchValue.toLowerCase();
  //   this._userService.searchUsers(value)
  //   .subscribe(result => {
  //     this.name_filtered_items = result;
  //     this.items = this.combineLists(result, this.age_filtered_items);
  //   });
  // }

  // rangeChange(event) {
  //   this._userService.searchUsersByAge(event.value)
  //   .subscribe(result => {
  //     this.age_filtered_items = result;
  //     this.items = this.combineLists(result, this.name_filtered_items);
  //   });
  // }

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
  delete(id) {
    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._userService.deleteOrgUser(this.currentOrgId, id)
        .then(
          res => {
            this.getData(this.currentOrgId);
            this._snackBar.open('Ogranisation is deleted successfully!');
          },
          err => {
            this._snackBar.open(err);
          }
        );
      }
    });

  }

  editDataDialog(obj): void {
    obj.orgId = this.currentOrgId;
    console.log(obj);
    
    this.dialog.open(EditUserComponent, {
      width: '450px',
      data: obj
    });
  }
  addDataDialog(): void {
    this.dialog.open(AddUserComponent, {width: '450px', data: this.currentOrgId});
    this.getData(this.currentOrgId);
  }

}
