import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  constructor(public db: AngularFirestore) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getOrg(userKey) {
    return this.db.collection('orgs').doc(userKey).snapshotChanges();
  }
  getSports() {
    return this.db.collection('sports').valueChanges();
  }

  updateOrg(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('orgs').doc(userKey).set(value);
  }

  deleteOrg(userKey) {
    return this.db.collection('orgs').doc(userKey).delete();
  }

  getOrgs() {
    return this.db.collection('orgs').valueChanges();
  }

  searchOrgs(searchValue) {
    return this.db.collection('orgs', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchOrgsByAge(value) {
    return this.db.collection('orgs', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createOrg(value) {
    let createdId = this.db.createId();
    return this.db.collection('orgs').doc(createdId).set({
      name: value.name,
      id: createdId,
      nameToSearch: value.name.toLowerCase(),
      tin_no: value.tin_no,
      street: value.street,
      city: value.city,
      pin: value.pin,
      country: value.country,
      userId: firebase.auth().currentUser.uid,
      createdAt: new Date().getTime()
    });
  }
}
