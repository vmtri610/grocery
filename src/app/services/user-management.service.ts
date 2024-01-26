import { Injectable } from '@angular/core';
import { DocumentData} from "@angular/fire/compat/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {User} from "../models/user.model";
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  prodList :DocumentData[] = [];
  constructor(private firestore:Firestore) {}

  async addUser(user: User) {
    const userCollection = collection(this.firestore, 'users');
    await addDoc(userCollection, user);
  }

  async updateUser(user:DocumentData){
    await updateDoc(doc(this.firestore, 'users', user['id']), user);
  }

  async deleteUser(user:DocumentData){
    await deleteDoc(doc(this.firestore, 'users', user['id']));
  }

  async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'users'));
      this.prodList = [];

      querySnapshot.forEach((doc) => {
        this.prodList.push(doc.data());
      });

      console.log(this.prodList);
      console.log("get all users");
    } catch (error) {
      console.error('Error getting users:', error);
    }
  }


  isCheckExistUserByEmail: boolean = false;
  async checkExistUserByEmail(user: User) {
    onSnapshot(collection(this.firestore, 'users'), (snapshot) => {
      this.prodList = [];
      snapshot.forEach((doc) => {
        this.prodList.push(doc.data());
      });
    });
    this.isCheckExistUserByEmail = false;
    this.prodList.forEach((value) => {
      console.log("value: " + value['email']);
      if (value['email'] == user['email']) {
        this.isCheckExistUserByEmail = true;
      }
    });
    console.log("isCheckExistUserByEmail: " + this.isCheckExistUserByEmail);
    console.log("user: " + user.email);
  }

}
