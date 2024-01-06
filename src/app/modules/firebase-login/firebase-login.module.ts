import { NgModule } from '@angular/core';

import { FirebaseLoginPageRoutingModule } from './firebase-login-routing.module';

import { FirebaseLoginPage } from './firebase-login.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    FirebaseLoginPageRoutingModule,
    SharedModule
  ],
  declarations: [FirebaseLoginPage]
})
export class FirebaseLoginPageModule { }
