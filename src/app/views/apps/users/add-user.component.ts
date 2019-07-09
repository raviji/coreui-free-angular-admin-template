import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
// import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { OrgService } from '../../../core/services/org.service';
import { UserService } from '../../../core/services/user.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  selectedSportsList = new FormControl();
  sportsList: any = [];
  selectedAppsList = new FormControl();
  appsList: any = [];


  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'email': [
     { type: 'required', message: 'Tin number is required.' }
   ]
 };


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    public orgUserService: UsersService,
    @Inject(MAT_DIALOG_DATA) public _orgID: any
  ) {
    console.log(_orgID);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }

  resetFields() {
    this.addUserForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit(obj) {

    console.log(obj);

    this.orgUserService.createOrgUser(obj, this._orgID)
    .then(
      res => {
        this.dialog.closeAll();
        this.resetFields();
        this._snackbar.open('User is invited successfully! User can check their mail for further.');
      }
    );
  }

  onNoClick(): void {
    this.dialog.closeAll();
}

}
