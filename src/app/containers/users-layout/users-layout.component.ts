import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { navItems } from '../../_nav_org';
import { AuthService } from '../../core/auth.service';
import { FirebaseService } from '../../core/services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-layout.component.html'
})
export class UsersLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public userProfile: any = [];
  constructor(
    public authService: AuthService,
    private location: Location,
    private _user: FirebaseService,
    @Inject(DOCUMENT) _document?: any
    ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit() {
    this._user.getEmp(firebase.auth().currentUser.uid).subscribe(
      res => {
        this.userProfile =  res;
      }
    );
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log('logout error', error);
    });
  }
}
