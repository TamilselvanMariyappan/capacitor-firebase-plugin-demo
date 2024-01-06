import { Injectable, NgZone } from '@angular/core';
import {
  ConfirmVerificationCodeOptions,
  FirebaseAuthentication,
  GetIdTokenOptions,
  PhoneVerificationCompletedEvent,
  SignInResult,
  SignInWithPhoneNumberOptions,
  User,
} from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { Observable, ReplaySubject, Subject, lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  private currentUserSubject = new ReplaySubject<User | null>(1);
  private phoneVerificationCompletedSubject =
    new Subject<PhoneVerificationCompletedEvent>();
  private phoneCodeSentSubject = new Subject<{
    verificationId: string;
  }>();

  constructor(
    private readonly platform: Platform,
    private readonly ngZone: NgZone,
  ) {
    // Only needed to support dev livereload.
    FirebaseAuthentication.getCurrentUser().then((result) => {
      this.currentUserSubject.next(result.user);
    });
  }

  public get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  public async initialize(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    /**
     * Only needed if the Firebase JavaScript SDK is used.
     *
     * Read more: https://github.com/robingenz/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
     */
    initializeApp(environment.firebase);
  }

  public async getRedirectResult(): Promise<SignInResult | undefined> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    return FirebaseAuthentication.getRedirectResult();
  }

  public getCurrentUser(): Promise<User | null> {
    return lastValueFrom(this.currentUser$.pipe(take(1)));
  }

  public async getIdToken(options?: GetIdTokenOptions): Promise<string> {
    const result = await FirebaseAuthentication.getIdToken(options);
    return result.token;
  }

  public async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  }

  public async signInWithMicrosoft() {
    const result = await FirebaseAuthentication.signInWithMicrosoft();
    return result.user;
  }

  public async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }
}