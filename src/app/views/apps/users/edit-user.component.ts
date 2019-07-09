import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { OrgService } from '../../../core/services/org.service';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  editOrgUserForm: FormGroup;
  constructor(
    public orgUserService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {
    // console.log(this.obj);
  }

  ngOnInit() {
    this.editOrgUserForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ]
    });
    this.setEdit();
  }
  setEdit() {
    this.editOrgUserForm.patchValue(this.obj);
  }

  onSubmit(obj) {
    console.log(obj);
    let newObj = {...this.obj, ...obj};
    this.orgUserService.updateOrgUser(newObj)
    .then(
      res => {
        this._snackBar.open('User is updated successfully!');
        this.editOrgUserForm.reset();
        this.dialog.closeAll();
      }
    );
  }
  cancel() {
    this.dialog.closeAll();
    this.editOrgUserForm.reset();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 === o2;
  }

}
