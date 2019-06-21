import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
// import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { OrgService } from '../../core/services/org.service';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html'
})
export class AddOrgComponent implements OnInit {

  addOegForm: FormGroup;
  avatarLink: string = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
  toppings = new FormControl();
  sportsList: any = [];
// tslint:disable-next-line: max-line-length
  toppingList: string[] = ['', '', '', '', '', '', '', '', '', '', '', '', ''];

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
  }

  createForm() {
    this.addOegForm = this.fb.group({
      name: ['', Validators.required ],
      tin_no: ['', Validators.required ],
      street: ['', Validators.required ],
      city: ['', Validators.required ],
      pin: ['', Validators.required ],
      country: ['', Validators.required ]
    });
  }

  getSportList() {
    this.orgService.getSports().subscribe( (
      res => {
        this.sportsList = res;
        console.log(res);
      }
    ));
  }

  resetFields() {
    this.avatarLink = 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg';
    this.addOegForm = this.fb.group({
      name: new FormControl('', Validators.required),
      tin_no: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.orgService.createOrg(value)
    .then(
      res => {
        this.dialog.closeAll();
        this.resetFields();
        this._snackbar.open('Organisation is added successfully!');
      }
    );
  }

  onNoClick(): void {
    this.dialog.closeAll();
}

}
