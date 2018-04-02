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
import {HomeLayoutComponent} from './ui/layouts/home-layout/home-layout.component';
import {AdminGuard} from './guards/admin.guard';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: UserRegisterComponent },
            { path: 'confirmaccount', component: UserRegisterConfirmComponent },
            { path: 'schedule', component: CalendarComponent },
            { path: 'passwordreset/:PasswordResetToken', component: UserPasswordResetComponent },
            { path: '**', redirectTo: 'schedule'}
        ]
    },
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'sessions', component: SessionListComponent },
            { path: 'profile', component: UserDetailComponent },
            { path: 'globalsessions', component: GlobalSessionListComponent },
            { path: 'sessions/submit', component: SessionDetailComponent },
            { path: 'sessions/:SessionProposalId', component: SessionDetailComponent },
            { path: 'changepassword', component: UserChangePasswordComponent },
            { path: 'emailactivation/:EmailActivationToken', component: UserEmailActivationComponent },
            { path: 'schedule', component: CalendarComponent },
            { path: 'schedule-builder', component: BuilderScheduleComponent, canActivate: [AdminGuard] },
            { path: '**', redirectTo: 'schedule' }
        ],
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [ RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ) ],
    exports: [ RouterModule ]
  })

  export class AppRoutingModule {}