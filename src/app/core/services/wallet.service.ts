import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(public db: AngularFirestore) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getWallet(userKey) {
    return this.db.collection('wallets').doc(userKey).snapshotChanges();
  }

  updateWallet(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('wallets').doc(userKey).set(value);
  }

  deleteWallet(userKey) {
    return this.db.collection('wallets').doc(userKey).delete();
  }

  getWallets() {
    return this.db.collection('wallets').snapshotChanges();
  }

  searchWallets(searchValue) {
    return this.db.collection('wallets', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchWalletsByAge(value) {
    return this.db.collection('wallets', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createWallet(value, avatar) {
    let createdId = this.db.createId();
    return this.db.collection('wallets').doc(createdId).set({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      avatar: avatar,
      userId: firebase.auth().currentUser.uid,
      createdAt: new Date().getTime()
    });
  }
}
