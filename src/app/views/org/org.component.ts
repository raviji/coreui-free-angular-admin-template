import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { OrgService } from '../../core/services/org.service';
import * as firebase from 'firebase/app';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditOrgComponent } from './edit-org.component';
import { ConfirmboxComponent } from '../../core/shared/confirmbox.component';
import { AddOrgComponent } from './add-org.component';

@Component({
  templateUrl: 'org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'city', 'country', 'sportsLists', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  currentUser: any;
  sportsList: any;
  constructor(
    public orgService: OrgService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.currentUser = firebase.auth().currentUser;
    // console.log(this.currentUser.uid);
  }

  ngOnInit() {
    this.getSportList();
  }
  ngAfterViewInit() {
    this.getData();
  }
  getData() {
    this.orgService.getOrgs()
    .subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
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
    this.orgService.searchOrgs(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  rangeChange(event) {
    this.orgService.searchOrgsByAge(event.value)
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
        this.orgService.deleteOrg(id)
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
    this.dialog.open(EditOrgComponent, {
      width: '450px',
      data: obj
    });
  }
  addDataDialog(): void {
    this.dialog.open(AddOrgComponent, {width: '450px'});
  }

  getSportList() {
    this.orgService.getSports().subscribe( (
      res => {
        this.sportsList = res;
        // console.log(res);
      }
    ));
  }

  getAppListName(id) {
    let appName = '';
    this.sportsList.filter( res => {
      // console.log(res, id);
      if (res.id === id) {
        appName = res.name;
      }
    });
    return appName;
  }

}
