import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from '../../core/services/org.service';

@Component({
  templateUrl: 'details.component.html',
})
export class DetailsComponent implements OnInit {
    selectedApps: any;
    appList: any;
    orgID: any;
    constructor(private route: ActivatedRoute, private _orgSer: OrgService, private _router: Router) {}

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            let data = routeData['data'];
            this.orgID = data.payload.id;
            if (data) {
                this.selectedApps = data.payload.data().appsLists;
                console.log(this.selectedApps);
            }
        });
        this.getAppList();
    }

    getAppList() {
        this._orgSer.getApps().subscribe(
            (res) => {
                this.appList = res;
                console.log(res);
            }
        );
    }

    goToLink(str) {
        if (str === 'users') {
            this._router.navigate([`/org/${this.orgID}/users`]);
        }
    }
}
