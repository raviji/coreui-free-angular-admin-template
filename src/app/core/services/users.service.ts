import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public db: AngularFirestore) {

  }

  getOrgUsers(orgKey) {
    return this.db.collection(`orgs/${orgKey}/users`).valueChanges();
  }
  updateOrgUser(obj) {
    console.log(obj);
    obj.updatedAt = new Date().getTime();
    return this.db.collection(`orgs/${obj.orgId}/users`).doc(obj.id).set(obj);
  }

  deleteOrgUser(orgKey, userKey) {
    return this.db.collection(`orgs/${orgKey}/users`).doc(userKey).delete();
  }

  // searchUsers(searchValue) {
  //   return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
  //     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
  //     .snapshotChanges();
  // }

  // searchUsersByAge(value) {
  //   return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  // }


  createOrgUser(value, id) {
    const createdId = this.db.createId();
      return this.db.collection('orgs').doc(id).collection('users').doc(createdId).set({
      name: value.name,
      id: createdId,
      role: '',
      createdBy: id,
      email: value.email,
      phone: '',
      photoUrl: '',
      createdAt: new Date().getTime(),
      updatedAt: null
    });
  }
}
