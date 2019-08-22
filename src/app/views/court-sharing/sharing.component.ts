import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { ShareService } from '../../core/services/share.service';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})

export class SharingComponent implements OnInit {
    animal: string;
    name: string;
    options: any = [];
    peopleData: any;
    selectedPeople: any = [];
    constructor(private _users: FirebaseService, public dialog: MatDialog, private _shareSer: ShareService) {}

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this._users.getEmps().subscribe(
            (users: any) => {
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
            data: this.options
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log(result);
            // Creating Group
            if (result) {
                result.createdAt = Date.now();
                result.updatedAt = Date.now();
                result.createdBy = firebase.auth().currentUser.uid;
                this._shareSer.createGroup(result).then(val => {
                    console.log(val, 'successfully added group');
                }).catch(err => {
                    console.log(err, 'Error creating group!');
                });
            }
            // result.selected.forEach((el) => {
            //     this.peopleData.forEach(pl => {
            //         if (el === pl.empId) {
            //             this.selectedPeople.push(pl.empId);
            //             // console.log(this.selectedPeople);
            //         }
            //     });
            // });
        });



    }
}

// Add People Dialog
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-people',
    templateUrl: './modal/add-people.component.html',
  })
  export class AddPeopleComponent implements OnInit{
    obj: any = {name: 'ravi', email: 'html5ravi@gmail.com'};
    @ViewChild(SelectAutocompleteComponent, {static: false}) multiSelect: SelectAutocompleteComponent;
    groupForm = new FormGroup({
        selectedPplList: new FormControl([], [Validators.required]),
        groupName: new FormControl('', [
            Validators.required
          ])
    });
    constructor(public dialogRef: MatDialogRef<AddPeopleComponent>,
        private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        // console.log(data);
    }

    ngOnInit() {
        // this.createForm();
      }
      onNoClick(): void {
        this.dialogRef.close();
      }
    // createForm() {
    //     this.groupForm = this.fb.group({
    //         groupName: ['', Validators.required ],
    //         selected: [[], Validators.required ]
    //     });
    //   }

    onSubmit() {
    console.log(this.groupForm.value);
    }

  }
