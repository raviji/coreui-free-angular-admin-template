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
    // this.share = this.shareCollection.snapshotChanges().pipe(map(
    //   changes => {
    //     return changes.map(
    //       a => {
    //         const data = a.payload.doc.data() as Share;
    //         data.id = a.payload.doc.id;
    //         return data;
    //       });
    //   }));
    // return this.share;
  }
  addShare(obj) {
    // return this.shareCollection.add(obj).then((res) => {});
  }
  deleteShare(obj) {
    // this.shareDoc = this._afs.doc(`share/${obj.id}`);
    // this.shareDoc.delete();
  }

  getCoutShare(userKey) {
    return this.db.collection('court-share').doc(userKey).snapshotChanges();
  }

  updateCoutShare(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('court-share').doc(userKey).set(value);
  }

  deleteCoutShare(userKey) {
    return this.db.collection('court-share').doc(userKey).delete();
  }

  getCoutShares() {
    return this.db.collection('court-share').snapshotChanges();
  }

  searchCoutShares(searchValue) {
    return this.db.collection('court-share', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchCoutSharesByDate(value) {
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
  // Create Group
  createGroup(obj) {
    obj.id = this.db.createId();
    return this.db.collection('share-Groups').doc(obj.id).set(obj);
  }
}
