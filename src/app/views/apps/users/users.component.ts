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

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  _dataSource: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  currentUser: any;
  constructor(
    public _userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.currentUser = firebase.auth().currentUser;
    // console.log(this.currentUser.uid);
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data);
  });
  }
  ngAfterViewInit() {
    this.getData();
  }
  getData() {
    this._userService.getUsers()
    .subscribe(result => {
      console.log(result);
      this._dataSource = new MatTableDataSource(result);
      this._dataSource.paginator = this.paginator;
      // console.log(this._dataSource.length);
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/org/edit-org/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this._userService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  rangeChange(event) {
    this._userService.searchUsersByAge(event.value)
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
  delete(id) {
    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._userService.deleteUser(id)
        .then(
          res => {
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
    this.dialog.open(EditUserComponent, {
      width: '450px',
      data: obj
    });
  }
  addDataDialog(): void {
    this.dialog.open(AddUserComponent, {width: '450px'});
  }

}
