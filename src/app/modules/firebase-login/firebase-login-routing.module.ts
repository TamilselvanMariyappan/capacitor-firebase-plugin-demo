import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirebaseLoginPage } from './firebase-login.page';

const routes: Routes = [
  {
    path: '',
    component: FirebaseLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebaseLoginPageRoutingModule {}
