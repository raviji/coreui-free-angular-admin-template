export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  userId: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
    this.userId = '';
  }
}
