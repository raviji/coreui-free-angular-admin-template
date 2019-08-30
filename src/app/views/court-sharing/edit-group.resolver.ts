import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ShareService } from '../../core/services/share.service';

@Injectable()
export class EditGroupResolver implements Resolve<any> {

  constructor(public groupService: ShareService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const groupId = route.paramMap.get('id');
      this.groupService.getGroupById(groupId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
