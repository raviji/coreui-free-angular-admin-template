import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { ShareService } from '../../core/services/share.service';
import { ConfirmboxComponent } from '../../core/shared/confirmbox.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})

export class SharingComponent implements OnInit {
    animal: string;
    username: any;
    name: string;
    options: any = [];
    peopleData: any;
    selectedPeople: any = [];
    displayedColumns: string[] = ['groupName', 'selectedPplList', 'createdAt', 'updatedAt', 'action'];
    dataSource: any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // tslint:disable-next-line: max-line-length
    constructor(private _users: FirebaseService, private router: Router, public dialog: MatDialog, private _shareSer: ShareService, private _snackBar: MatSnackBar) {}

    ngOnInit() {
        this.getAllUsers();
        this.getGroupData();
    }

    getAllUsers() {
        this._users.getEmps().subscribe(
            (users: any) => {
                // console.log(users);
                this.peopleData = users;
                users.forEach(el => {
                    this.options.push({
                        display: el.email,
                        value: el.empId
                    });
                });
            }
        );
    }

    addPeople(): void {
        const dialogRef = this.dialog.open(AddPeopleComponent, {
            width: '300px',
            data: this.peopleData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.createdAt === undefined) {
                // console.log(result, 'add');
                 result.createdAt = Date.now();
                result.updatedAt = Date.now();
                result.createdBy = firebase.auth().currentUser.uid;
                result.userId = firebase.auth().currentUser.uid;
                this._shareSer.createGroup(result).then(val => {
                    this._snackBar.open('successfully added group');
                }).catch(err => {
                    this._snackBar.open(err, 'Error creating group!');
                });
            }
        });
    }

    editGroupDataDialog(obj) {
        const dialogRef = this.dialog.open(AddPeopleComponent, {
            width: '300px',
            data: obj
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                obj.updatedAt = Date.now();
                obj.groupName = result.groupName;
                obj.selectedPplList = result.selectedPplList;
                this._shareSer.updateGroup(obj.id, obj).then(val => {
                    this._snackBar.open('Group details Successfully Modified!');
                }).catch(err => {
                    this._snackBar.open('Error Modifying group!');
                });
            }
        });
    }
    getGroupData() {
        this._shareSer.getGroups().subscribe((result: any) => {
            // console.log(result);
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
        });
    }
    deleteGroup(key) {
        const dialogRef = this.dialog.open(ConfirmboxComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this Group?'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._shareSer.deleteGroup(key)
              .then(
                res => {
                  this._snackBar.open('Your group is deleted successfully!');
                },
                err => {
                  this._snackBar.open(err);
                }
              );
            }
          });
    }

    groupDetails(obj: any) {
        // console.log(obj);
        this.router.navigate([`/sharing/${obj.id}`]);
    }
}

// Add People Dialog
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-people',
    templateUrl: './modal/add-people.component.html',
})
export class AddPeopleComponent implements OnInit {

@ViewChild(SelectAutocompleteComponent, {static: false}) multiSelect: SelectAutocompleteComponent;
    groupForm = new FormGroup({
        selectedPplList: new FormControl([], [Validators.required]),
        groupName: new FormControl('', [Validators.required])
    });
    options: any = [];
    peopleData: any;
    selectedOptions: any = [];
    constructor(public dialogRef: MatDialogRef<AddPeopleComponent>,
        private fb: FormBuilder,
        private _users: FirebaseService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            // console.log(data);
    }

    ngOnInit() {
        if (this.data.createdAt) {
                this.setForm();
                this.getAllUsers();
        } else {
            this.selectedOptions = [];
        }
    }
    getAllUsers() {
        this._users.getEmps().subscribe(
            (users: any) => {
                this.data = users;
            }
        );
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    setForm() {
        this.groupForm.get('groupName').setValue(this.data.groupName);
        this.selectedOptions = this.data.selectedPplList;
        // console.log(this.selectedOptions);
    }
    onSubmit() {
        // console.log(this.groupForm.value);
    }

}

