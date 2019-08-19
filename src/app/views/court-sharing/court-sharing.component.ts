import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareService } from '../../core/services/share.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase.service';

@Component({
  selector: 'app-court-sharing',
  templateUrl: './court-sharing.component.html',
  styleUrls: ['./court-sharing.component.scss']
})

export class CourtSharingComponent implements OnInit {
  // registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

//  private _onChange: () => void;
  addShareForm: FormGroup;
  submitted = false;
  people: any = [];
  balance_sheet: any = [];
  public today = new Date();
  public checkExistingDate: any;
  public checkExistingMsg: string;
  public existDate: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _share: ShareService,
    private _router: Router,
    // private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _people: FirebaseService) {

   }

  ngOnInit() {
    // this.spinner.show();
      this.addShareForm = this.formBuilder.group({
        when: ['', Validators.required],
        courtFee: ['', Validators.required],
        courtPaidBy: ['', Validators.required],
        shuttleCost: ['', Validators.required],
        shuttleTookBy: ['', Validators.required],
        extraHours: [false],
        totalAmount: [''],
        whoPlayed: ['', Validators.required],
        extraWhoPlayed: [''],
        extraCourtFee: ['']
          // email: ['', [Validators.required, Validators.email]],
          // password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.getPeopleList();

      /*this._share.getShare().subscribe(
        data => {
          // this.spinner.hide();
          this.checkExistingDate = data;
          // console.log(data);
        });*/
  }

  compareDate(event) {
    let tests = null;
    // console.log(event.value.toDateString());
    this.checkExistingDate.forEach(function(val) {
      // console.log(new Date(val.when.toDate()).toDateString())
      if (new Date(val.when.toDate()).toDateString() === event.value.toDateString()) {
        tests = 'This date is already updated!';
      }
    });
    this.checkExistingMsg = tests;
    if (tests) {
      this.existDate = true;
    }
    console.log(this.checkExistingMsg);
  }
  getPeopleList() {
    // console.log("calling")
    // this.spinner.show();
    this._people.getEmps().subscribe(
      data => {
        this.people = data;
        // this.spinner.hide();
        console.log(data);
      });
  }
// convenience getter for easy access to form fields
    get f(): any { return this.addShareForm.controls; }

    onSubmit() {
      // this.spinner.show();
        this.submitted = true;
        // stop here if form is invalid
        if (this.addShareForm.invalid) {
            return;
        }
        // Total Amount
        this.addShareForm.value.totalAmount = this.addShareForm.value.courtFee + this.addShareForm.value.shuttleCost;
        // Divide total into who played
        const divideAmount = this.addShareForm.value.totalAmount / this.addShareForm.value.whoPlayed.length;
        // console.log(divideAmount)
        const shareSheet = [];
         const courtBy = this.addShareForm.value.courtPaidBy;
        const courtAmt = this.addShareForm.value.courtFee;
        const shuttleBy = this.addShareForm.value.shuttleTookBy;
        const shuttleCost = this.addShareForm.value.shuttleCost;
        this.addShareForm.value.whoPlayed.forEach(function (value) {
          console.log(value);
          if (courtBy === value && shuttleBy === value) {
            shareSheet.push({
                id: value,
                played: divideAmount,
                court: courtAmt,
                shuttle: shuttleCost
              });
          } else if (courtBy === value) {
            shareSheet.push({
                id: value,
                played: divideAmount,
                court: courtAmt,
                shuttle: 0
              });
          } else if (shuttleBy === value) {
            shareSheet.push({
                id: value,
                played: divideAmount,
                court: 0,
                shuttle: shuttleCost
              });
          } else {
            shareSheet.push({
              id: value,
              played: divideAmount,
              court: 0,
              shuttle: 0
            });
          }
        });

      //  console.log(shareSheet)
       this.addShareForm.value.shareSheet = shareSheet;
       this.addShareForm.value.createdAt = this.today;
        /*this._share.addShare(this.addShareForm.value).then(() => {
          // this.spinner.hide();
           this._router.navigate([''], { relativeTo: this.route });
          }).catch(function() {
            this.spinner.hide();
          });*/
    }
}
