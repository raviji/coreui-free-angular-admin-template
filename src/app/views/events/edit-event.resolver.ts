import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';

@Injectable()
export class EditEventResolver implements Resolve<any> {

  constructor(public eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let eventId = route.paramMap.get('id');
      this.eventService.getEvent(eventId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
