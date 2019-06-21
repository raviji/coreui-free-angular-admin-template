import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { OrgService } from '../../core/services/org.service';


@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html'
})
export class EditOrgComponent implements OnInit {

  editOrgForm: FormGroup;

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
      tin_no: ['', Validators.required ],
      street: ['', Validators.required ],
      city: ['', Validators.required ],
      pin: ['', Validators.required ],
      country: ['', Validators.required ]
    });
    this.setEdit();
  }
  setEdit() {
    this.editOrgForm.patchValue(this.obj);
  }
  onSubmit(obj) {
    let newObj = {...this.obj, ...obj};
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

}
