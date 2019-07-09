import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public db: AngularFirestore) {
    
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }
  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    value.updatedAt = new Date().getTime();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').valueChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value) {
    let createdId = this.db.createId();
    return this.db.collection('users').doc(createdId).set({
      name: value.name,
      id: createdId,
      createdBy: value.createdBy,
      email: value.email,
      phone: value.phone,
      createdAt: new Date().getTime(),
      updatedAt: null
    });
  }
}
