import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { OrgService } from '../../core/services/org.service';

@Injectable()
export class EditOrgResolver implements Resolve<any> {

  constructor(public orgService: OrgService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let orgId = route.paramMap.get('id');
      this.orgService.getOrg(orgId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
