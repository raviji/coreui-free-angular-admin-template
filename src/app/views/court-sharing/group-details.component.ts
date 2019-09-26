import {Component, OnInit, ViewChild, AfterViewInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from '../../core/services/share.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CourtSharingComponent } from './court-sharing.component';
import { FirebaseService } from '../../core/services/firebase.service';
export interface PeriodicElement {
    when: string;
    courtFee: number;
    id: string;
    totalAmount: number;
    toDate: string;
    whoPlayed: Array<any>;
    shareSheet: Array<any>;
    people: Array<any>;
  }

@Component({
  templateUrl: 'group-details.component.html',
})
export class GroupDetailsComponent implements OnInit {
    selectedGroup: any;
    groupID: any;

    displayedColumns: string[] = ['when', 'courtFee', 'id'];
    dataSource: any;
    shareData: any;
    peopleList: any;
    peopleGroupListToSendCS: any = [];
    sum: any = [];
    hidden: Boolean = false;
    deleteRecord: Boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private route: ActivatedRoute,
        private _shareSer: ShareService,
        private _router: Router,
        private _shareData: ShareService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _groupPplList: FirebaseService
        ) {}

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            const data = routeData['data'];
            this.groupID = data.payload.id;
            if (data) {
                this.selectedGroup = data.payload.data();
                console.log(this.selectedGroup.id);
                // console.log(this.selectedGroup.selectedPplList);
            }
        });
        this.getAllUsers();
        this.route.queryParams.subscribe(params => {
            // console.log(params);
            if (params.delete === 's') {
                this.deleteRecord = true;
            }
        });
        this.getGroupRecords();
    }

    getGroupRecords() {
      this.sum = [];
        this._shareData.getShare(this.selectedGroup.id).subscribe(
            data => {
                this.shareData = data;
                if (data) {this.calculateShareAmount(this.shareData); }
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
        });
    }

    addShare() {
        const dialogRef = this.dialog.open(CourtSharingComponent, {
            data: this.peopleGroupListToSendCS
        });
        dialogRef.afterClosed().subscribe(result => {
            result.groupId = this.selectedGroup.id;
            this._shareSer.addShare(result).then(() => {
                this._snackBar.open('your share is added successfully!');
                this.getGroupRecords();
                }).catch(function() {
                this._snackBar.open('error');
            });
        });
    }

    getAllUsers() {
        this._groupPplList.getEmps().subscribe(
            (users: any) => {
                this.peopleList = users;
                // console.log(this.peopleList);
                this.selectedGroup.selectedPplList.forEach(i => {
                    this.peopleList.forEach(j => {
                        if (i === j.empId) {
                            this.peopleGroupListToSendCS.push(j);
                        }
                    });
                });
            }
        );
    }
    calculateShareAmount(arr: any) {
      // console.log(arr, this.selectedGroup.selectedPplList);
      // Calculate Shares total by id
      const totalPaid = [];
      this.sum = [];
      if (this.selectedGroup.selectedPplList.length > 0) {
        for (const ids of this.selectedGroup.selectedPplList) {
          let a = 0;
          let p = 0;
          for (const s of arr) {
            s.shareSheet.forEach(function(val: any, key: any) {
              // console.log(key, val);
               if (val.id === ids) {
                // console.log(val.id, ids);
                a = a + val.court + val.shuttle;
                p = p + val.played;
              }
            });
          }
          this.sum.push({id : ids, totalPaid : a, totalPlayed : p, toPay: a - p});
        }
        // console.log(this.sum);
      }
    }

    delete(id) {
     this._shareData.deleteShare(id);
    }
    showPop(element): void {
        // console.log(element);
      element.people = this.peopleGroupListToSendCS;
      const dialogRef = this.dialog.open(AppShareDataDialogComponent, {
        data: element
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

    getUserName(obj) {
        const usrs = [];
        obj.forEach((item) => {
            // console.log(item);
            const a = this.selectedGroup.selectedPplList.filter(people => people.empId === item)[0];
            usrs.push(a.name);
        });
        return usrs;
    }

  }

  // Dialog Box
  @Component({
    selector: 'app-share-data-dialog-component',
    templateUrl: './modal/share-data-dialog.component.html',
  })
  export class AppShareDataDialogComponent {
    constructor(
        private _groupPplList: FirebaseService,
        public dialogRef: MatDialogRef<AppShareDataDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public _datas: PeriodicElement) {
        // console.log(this._datas);

        }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
