/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserEmailActivationComponent } from './user-email-activation.component';

describe('UserEmailActivationComponent', () => {
  let component: UserEmailActivationComponent;
  let fixture: ComponentFixture<UserEmailActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEmailActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmailActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
