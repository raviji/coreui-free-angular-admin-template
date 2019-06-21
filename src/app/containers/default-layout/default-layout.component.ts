import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    public authService: AuthService,
    private location: Location,
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

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.authService.doLogout()
    .then((res) => {
      alert("logout works");
      this.location.back();
    }, (error) => {
      console.log('logout error', error);
    });
  }
}
