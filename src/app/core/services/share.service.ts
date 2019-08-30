import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Share } from '../interface/share';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  // shareCollection: AngularFirestoreCollection<Share>;
  share: Observable<Share[]>;
  constructor(public db: AngularFirestore) {
    // this.shareCollection = this._afs.collection('share', ref => ref.orderBy('when', 'desc'));

   }

  getShare() {
    return this.db.collection('share').doc(firebase.auth().currentUser.uid).collection('shareSheet').valueChanges();
  }
  addShare(obj) {
    obj.id = this.db.createId();
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('shareSheet').doc(obj.id).set(obj);
    // return this.shareCollection.add(obj).then((res) => {});
  }
  // Group details
  createGroup(obj) {
    obj.id = this.db.createId();
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('Groups').doc(obj.id).set(obj);
  }
  getGroupById(userKey) {
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('Groups').doc(userKey).snapshotChanges();
  }
  getGroups() {
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('Groups').valueChanges();
  }
  updateGroup(userKey, obj) {
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('Groups').doc(userKey).set(obj);
  }
  deleteGroup(userKey) {
    return this.db.collection(`share`).doc(firebase.auth().currentUser.uid).collection('Groups').doc(userKey).delete();
  }







  deleteShare(obj) {
    // this.shareDoc = this._afs.doc(`share/${obj.id}`);
    // this.shareDoc.delete();
  }

  getCourtShare(userKey) {
    return this.db.collection('court-share').doc(userKey).snapshotChanges();
  }

  updateCourtShare(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('court-share').doc(userKey).set(value);
  }

  deleteCourtShare(userKey) {
    return this.db.collection('court-share').doc(userKey).delete();
  }

  getCourtShares() {
    return this.db.collection('court-share').snapshotChanges();
  }

  searchCourtShares(searchValue) {
    return this.db.collection('court-share', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchCourtSharesByDate(value) {
    return this.db.collection('court-share', ref => ref.orderBy('when').startAt(value)).snapshotChanges();
  }


  createCoutShare(value, avatar) {
    let createdId = this.db.createId();
    return this.db.collection('court-share').doc(createdId).set({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      avatar: avatar,
      userId: firebase.auth().currentUser.uid,
      createdAt: new Date().getTime()
    });
  }
  // Group Details

  
  
}
