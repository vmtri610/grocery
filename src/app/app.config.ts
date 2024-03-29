import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideState, provideStore } from '@ngrx/store';
import {productReducer} from "./ngrx/reducers/product.reducer";
import { provideEffects } from '@ngrx/effects';
import { ProductEffect } from "./ngrx/effects/product.effect";
import {cartReducer} from "./ngrx/reducers/cart.reducer";
import {CartEffect} from "./ngrx/effects/cart.effect";
import {userReducer} from "./ngrx/reducers/user.reducer";
import {UserEffect} from "./ngrx/effects/user.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "grocery-ce948", "appId": "1:762951074246:web:59fe727ef8c0302f0032c7", "storageBucket": "grocery-ce948.appspot.com", "apiKey": "AIzaSyAJ2lE7d6jIwk5Zp55Btg5jiIuV012IckM", "authDomain": "grocery-ce948.firebaseapp.com", "messagingSenderId": "762951074246", "measurementId": "G-NKXNW7TS9S" }))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideStore(),
    provideState({ name: 'product', reducer: productReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideEffects(),
    provideEffects(ProductEffect),
    provideEffects(CartEffect),
    provideEffects(UserEffect),
]
};
