import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserColis } from './user-colis';

describe('UserColis', () => {
  let component: UserColis;
  let fixture: ComponentFixture<UserColis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserColis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserColis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
