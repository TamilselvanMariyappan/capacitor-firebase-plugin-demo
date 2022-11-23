import { Component } from '@angular/core';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import {
  FirebaseRemoteConfig,
  GetValueSource,
} from '@capacitor-firebase/remote-config';

@Component({
  selector: 'app-firebase-remote-config',
  templateUrl: './firebase-remote-config.page.html',
  styleUrls: ['./firebase-remote-config.page.scss'],
})
export class FirebaseRemoteConfigPage {
  public key = '';
  public value = '';
  public source = '';

  private readonly githubUrl =
    'https://github.com/robingenz/capacitor-firebase';

  constructor() {}

  ionViewDidEnter() {
    FirebaseAnalytics.setCurrentScreen({
      screenName: 'FirebaseRemoteConfigPage',
    });
  }

  public openOnGithub(): void {
    window.open(this.githubUrl, '_blank');
  }

  public async activate(): Promise<void> {
    await FirebaseRemoteConfig.activate();
  }

  public async fetchAndActivate(): Promise<void> {
    await FirebaseRemoteConfig.fetchAndActivate();
  }

  public async fetchConfig(): Promise<void> {
    await FirebaseRemoteConfig.fetchConfig();
  }

  public async getBoolean(): Promise<void> {
    const result = await FirebaseRemoteConfig.getBoolean({ key: this.key });
    this.value = result.value + '';
    this.source = this.mapGetValueSourceToString(result.source);
  }

  public async getNumber(): Promise<void> {
    const result = await FirebaseRemoteConfig.getNumber({ key: this.key });
    this.value = result.value + '';
    this.source = this.mapGetValueSourceToString(result.source);
  }

  public async getString(): Promise<void> {
    const result = await FirebaseRemoteConfig.getString({ key: this.key });
    this.value = result.value;
    this.source = this.mapGetValueSourceToString(result.source);
  }

  private mapGetValueSourceToString(
    source: GetValueSource | undefined
  ): string {
    switch (source) {
      case GetValueSource.ValueSourceDefault:
        return 'Default';
      case GetValueSource.ValueSourceRemote:
        return 'Remote';
      case GetValueSource.ValueSourceStatic:
        return 'Static';
      default:
        return 'Unknown';
    }
  }
}
