import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
// import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { OrgService } from '../../../core/services/org.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  addOrgForm: FormGroup;
  avatarLink: string = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
  selectedSportsList = new FormControl();
  sportsList: any = [];
  selectedAppsList = new FormControl();
  appsList: any = [];


  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'tin_no': [
     { type: 'required', message: 'Tin number is required.' }
   ],
   'street': [
     { type: 'required', message: 'Street is required.' },
   ],
   'city': [
    { type: 'required', message: 'City is required.' },
  ],
  'pin': [
    { type: 'required', message: 'Postal code is required.' },
  ],
  'country': [
    { type: 'required', message: 'Country is required.' },
  ]
 };


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    public orgService: OrgService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSportList();
    this.getAppList();
  }

  createForm() {
    this.addOrgForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      city: ['', Validators.required ],
      address: ['', Validators.required ],
      country: ['', Validators.required ],
    });
  }

  getSportList() {
    this.orgService.getSports().subscribe( (
      res => {
        this.sportsList = res;
      }
    ));
  }

  getAppList() {
    this.orgService.getApps().subscribe( (
      res => {
        this.appsList = res;
        console.log(res);
      }
    ));
  }

  resetFields() {
    this.avatarLink = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
    this.addOrgForm = this.fb.group({
      name: new FormControl('', Validators.required),
      tin_no: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      sportsList: new FormControl('', Validators.required),
      appsList: new FormControl('', Validators.required),
    });
  }

  onSubmit(obj) {

    obj.sportsLists = this.selectedSportsList.value;
    obj.appsLists = this.selectedAppsList.value;
    console.log(obj);

    this.orgService.createOrg(obj)
    .then(
      res => {
        this.dialog.closeAll();
        this.resetFields();
        this._snackbar.open('org is added successfully!');
      }
    );
  }

  onNoClick(): void {
    this.dialog.closeAll();
}

}
