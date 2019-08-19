import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { FormGroup, FormControl } from '@angular/forms';

export interface DialogData {
    animal: string;
    name: string;
  }

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
    constructor(private _users: FirebaseService, public dialog: MatDialog) {}

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
            console.log(result);
            result.selected.forEach((el) => {
                this.peopleData.forEach(pl => {
                    if (el === pl.empId) {
                        this.selectedPeople.push(pl.empId);
                        console.log(this.selectedPeople);
                    }
                });
            });
        });

        console.log(this.selectedPeople);


    }
}

// Add People Dialog
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-add-people',
    templateUrl: './modal/add-people.component.html',
  })
  export class AddPeopleComponent {
    obj: any = {name: 'ravi', email: 'html5ravi@gmail.com'};
    @ViewChild(SelectAutocompleteComponent, {static: false}) multiSelect: SelectAutocompleteComponent;
    profileForm = new FormGroup({
        selected: new FormControl([])
      });

    constructor(public dialogRef: MatDialogRef<AddPeopleComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) {
        // console.log(data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit() {
    // console.log(this.profileForm.value);
    }

  }
