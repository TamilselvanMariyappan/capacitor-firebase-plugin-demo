import { Component } from '@angular/core';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public plugins = [
    {
      name: 'Firebase Analytics',
      url: '/firebase-analytics',
    },
    {
      name: 'Firebase App',
      url: '/firebase-app',
    },
    {
      name: 'Firebase App Check',
      url: '/firebase-app-check',
    },
    {
      name: 'Firebase Cloud Messaging',
      url: '/firebase-messaging',
    },
    {
      name: 'Firebase Crashlytics',
      url: '/firebase-crashlytics',
    },
    {
      name: 'Firebase Performance',
      url: '/firebase-performance',
    },
    {
      name: 'Firebase Remote Config',
      url: '/firebase-remote-config',
    },
    {
      name: 'Firebase Storage',
      url: '/firebase-storage',
    },
  ];

  constructor() {}

  ionViewDidEnter() {
    FirebaseAnalytics.setCurrentScreen({
      screenName: 'HomePage',
    });
  }
}
