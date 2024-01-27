import { Injectable } from '@angular/core';
import {addDoc, collection, doc, Firestore, getDocs, setDoc} from "@angular/fire/firestore";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: Firestore) { }

  async addUser(user: User) {
    return await setDoc(doc(this.db, "users", user.id), user);
  }
}
