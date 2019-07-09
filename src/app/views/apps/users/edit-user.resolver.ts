import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { OrgService } from '../../../core/services/org.service';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor(public orgService: OrgService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.orgService.getOrg(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
