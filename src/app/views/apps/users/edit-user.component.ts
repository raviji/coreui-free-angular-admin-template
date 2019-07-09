import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { OrgService } from '../../../core/services/org.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  editOrgForm: FormGroup;
  sportsList: any = [];
  appsList: any = [];
  sportsListCtrl = new FormControl();
  appsListCtrl = new FormControl();
  test: any = [{id: 1}];
  constructor(
    public orgService: OrgService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {
    // console.log(this.obj);
  }

  ngOnInit() {
    this.editOrgForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      city: ['', Validators.required ],
      address: ['', Validators.required ],
      country: ['', Validators.required ],
    });
    this.sportsListCtrl = new FormControl(this.obj.sportsLists);
    this.appsListCtrl = new FormControl(this.obj.appsLists);
    this.setEdit();
    setTimeout(() => {
      this.getSportList();
      this.getAppList();
      setTimeout(() => {
        this.sportsListCtrl.setValue(this.sportsListCtrl.value);
        this.appsListCtrl.setValue(this.appsListCtrl.value);
      });
    }, 0);
  }
  setEdit() {
    this.editOrgForm.patchValue(this.obj);
    this.sportsListCtrl.setValue(this.obj.sportsLists);
    this.appsListCtrl.setValue(this.obj.appsLists);
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
      }
    ));
  }
  onSubmit(obj) {
    let newObj = {...this.obj, ...obj};
    newObj.sportsLists = this.sportsListCtrl.value;
    newObj.appsLists = this.appsListCtrl.value;
    // console.log(newObj);
    this.orgService.updateOrg(newObj.id, newObj)
    .then(
      res => {
        this._snackBar.open('Ogranisation is updated successfully!');
        this.editOrgForm.reset();
        this.dialog.closeAll();
      }
    );
  }
  cancel() {
    this.dialog.closeAll();
    this.editOrgForm.reset();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 === o2;
  }

}
