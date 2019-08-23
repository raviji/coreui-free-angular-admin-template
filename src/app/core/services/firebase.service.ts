import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  peopleDoc: any;
  constructor(public db: AngularFirestore) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }
  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar) {
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      avatar: avatar,
      userId: firebase.auth().currentUser.uid,
      createdAt: new Date().getTime()
    });
  }

  getEmp(userKey) {
    // console.log(userKey);
    return this.db.collection('emp').doc(userKey).valueChanges();
  }
  getPeopleById(id) {
    this.peopleDoc = this.db.doc(`emp/${id}`);
    return this.peopleDoc.get();
  }
  getEmps() {
    return this.db.collection('emp').valueChanges();
  }

  createEmpUser(obj) {
    // console.log(obj.uid);
    if (obj.uid) {
      this.db.doc(`emp/${obj.uid}`).update({}).then(() => {
        return;
      })
      .catch((error) => {
        return this.db.collection('emp').doc(obj.uid).set({
          name: obj.displayName,
          email: obj.email,
          phone: obj.phoneNumber,
          photo: obj.photoURL,
          empId: obj.uid,
          createdAt: new Date().getTime()
        });
      });
    }
  }

}
