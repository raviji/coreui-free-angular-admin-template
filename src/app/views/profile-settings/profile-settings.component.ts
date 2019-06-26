import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseService } from '../../core/services/firebase.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public userProfile: any;
  constructor(private _user: FirebaseService,) { }

  ngOnInit() {
    this._user.getEmp(firebase.auth().currentUser.uid).subscribe(
      res => {
        this.userProfile =  res;
      }
    );
  }

}
