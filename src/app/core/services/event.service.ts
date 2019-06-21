import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(public db: AngularFirestore) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getEvent(userKey) {
    return this.db.collection('events').doc(userKey).snapshotChanges();
  }

  updateEvent(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('events').doc(userKey).set(value);
  }

  deleteEvent(userKey) {
    return this.db.collection('events').doc(userKey).delete();
  }

  getEvents() {
    return this.db.collection('events').snapshotChanges();
  }

  searchEvents(searchValue) {
    return this.db.collection('events', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchEventsByAge(value) {
    return this.db.collection('events', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createEvent(value, avatar) {
    return this.db.collection('events').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar,
      userId: firebase.auth().currentUser.uid,
      createdAt: new Date().getTime()
    });
  }
}
