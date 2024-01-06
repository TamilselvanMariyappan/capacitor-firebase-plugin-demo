import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '@app/core';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.page.html',
  styleUrls: ['./firebase-login.page.scss'],
})
export class FirebaseLoginPage implements OnInit {

  constructor(private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService) { }

  ngOnInit() {    
  }

  public async signInWithGoogle(): Promise<void> {
    await this.signInWith(SignInProvider.google);
  }

  public async signInWithMicrosoft(): Promise<void> {
    await this.signInWith(SignInProvider.microsoft);
  }

  private async signInWith(provider: SignInProvider): Promise<void> {
    const loadingElement = await this.dialogService.showLoading();
    try {
      switch (provider) {
        case SignInProvider.google:
          await this.firebaseAuthenticationService.signInWithGoogle();
          break;
        case SignInProvider.microsoft:
          await this.firebaseAuthenticationService.signInWithMicrosoft();
          break;
      }
    } finally {
      await loadingElement.dismiss();
    }
  }
}

enum SignInProvider {
  apple = 'apple',
  facebook = 'facebook',
  github = 'github',
  google = 'google',
  microsoft = 'microsoft',
  playgames = 'playgames',
  twitter = 'twitter',
  yahoo = 'yahoo',
}
