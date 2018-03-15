import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './ui/auth/login/login.component';
import { SessionListComponent } from './ui/session/session-list/session-list.component';
import { GlobalSessionListComponent } from './ui/session/global-session-list/global-session-list.component';
import { SessionDetailComponent } from './ui/session/session-detail/session-detail.component';
import { UserRegisterComponent } from './ui/user/user-register/user-register.component';
import { UserRegisterConfirmComponent } from './ui/user/user-register-confirm/user-register-confirm.component';
import { UserDetailComponent } from './ui/user/user-detail/user-detail.component';
import { UserEmailActivationComponent } from './ui/user/user-email-activation/user-email-activation.component';
import { UserPasswordResetComponent } from './ui/user/user-password-reset/user-password-reset.component';
import { UserChangePasswordComponent } from './ui/user/user-change-password/user-change-password.component';
import { BuilderListComponent } from './ui/builder/builder-list/builder-list.component';
import { BuilderScheduleComponent } from './ui/builder/builder-schedule/builder-schedule.component';
import { CalendarComponent } from './ui/calendar/calendar.component';

import { AuthGuard } from './guards/auth.guard';
import {UserLayoutComponent} from './ui/layouts/user-layout/user-layout.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'confirmaccount', component: UserRegisterConfirmComponent },
    { path: 'sessionbuilder', component: BuilderListComponent },
    { path: 'sessionschedule', component: BuilderScheduleComponent },
    { path: 'sessioncalendar', component: CalendarComponent },
    { path: 'passwordreset/:PasswordResetToken', component: UserPasswordResetComponent },
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'sessions', component: SessionListComponent, canActivate: [AuthGuard] },
            { path: 'profile', component: UserDetailComponent, canActivate: [AuthGuard] },
            { path: 'globalsessions', component: GlobalSessionListComponent, canActivate: [AuthGuard] },
            { path: 'sessions/submit', component: SessionDetailComponent, canActivate: [AuthGuard] },
            { path: 'sessions/:SessionProposalId', component: SessionDetailComponent, canActivate: [AuthGuard] },
            { path: 'changepassword', component: UserChangePasswordComponent, canActivate: [AuthGuard] },
            { path: 'emailactivation/:EmailActivationToken', component: UserEmailActivationComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'sessions', canActivate: [AuthGuard]}
        ]
    },
    { path: '**', redirectTo: '', canActivate: [AuthGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ) ],
    exports: [ RouterModule ]
  })

  export class AppRoutingModule {}