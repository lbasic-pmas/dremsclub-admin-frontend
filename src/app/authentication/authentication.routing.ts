import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '404', component: ErrorComponent } ,
      // { path: 'lockscreen', component: LockscreenComponent } ,
      { path: 'forgot', component: ForgotComponent } ,
      { path: 'login' , component: LoginComponent } ,
      { path: 'recovery' , component: RecoveryComponent } ,
      // { path: 'register', component: RegisterComponent } ,
    ],
  },
];
