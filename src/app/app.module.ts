// MODULE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutletMap } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// UI COMPONENT
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/auth/login/login.component';
import { BuilderListComponent } from './ui/builder/builder-list/builder-list.component';
import { BuilderScheduleComponent } from './ui/builder/builder-schedule/builder-schedule.component';
import { CalendarComponent } from './ui/calendar/calendar.component';
import { GlobalSessionListComponent } from './ui/session/global-session-list/global-session-list.component';
import { SessionDetailComponent } from './ui/session/session-detail/session-detail.component';
import { SessionListComponent } from './ui/session/session-list/session-list.component';
import { GlobalSessionSearchComponent } from './ui/session/global-session-list/search/search.component';
import { UserChangePasswordComponent } from './ui/user/user-change-password/user-change-password.component';
import { UserDetailComponent } from './ui/user/user-detail/user-detail.component';
import { UserEmailActivationComponent } from './ui/user/user-email-activation/user-email-activation.component';
import { UserPasswordResetComponent } from './ui/user/user-password-reset/user-password-reset.component';
import { UserRegisterConfirmComponent } from './ui/user/user-register-confirm/user-register-confirm.component';
import { UserRegisterComponent } from './ui/user/user-register/user-register.component';
import { NavigationSmallComponent } from './ui/nav/navigation-small/navigation-small.component';
import { NavigationComponent } from './ui/nav/navigation/navigation.component';

// PIPES
import { SessionStatusTypePipe } from './pipes/session-status-type.pipe';
import { SessionTrackTypePipe } from './pipes/session-track-type.pipe';
import { FilterPipe } from './pipes/filter-search.pipe';
import { LimitToPipe } from './pipes/limit-to.pipe';

// SERVICES
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';
import { EventService } from './services/event.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';

//  GUARDS
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuilderListComponent,
    BuilderScheduleComponent,
    CalendarComponent,
    GlobalSessionListComponent,
    SessionDetailComponent,
    SessionListComponent,
    GlobalSessionSearchComponent,
    UserChangePasswordComponent,
    UserDetailComponent,
    UserEmailActivationComponent,
    UserPasswordResetComponent,
    UserRegisterConfirmComponent,
    UserRegisterComponent,
    NavigationSmallComponent,
    NavigationComponent,
    SessionStatusTypePipe,
    SessionTrackTypePipe,
    FilterPipe,
    LimitToPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ConfigService,
    EventService,
    SessionService,
    UserService,
    RouterOutletMap,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
