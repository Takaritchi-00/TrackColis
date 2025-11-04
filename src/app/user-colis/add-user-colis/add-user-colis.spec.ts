import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserColis } from './add-user-colis';

describe('AddUserColis', () => {
  let component: AddUserColis;
  let fixture: ComponentFixture<AddUserColis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserColis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserColis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
