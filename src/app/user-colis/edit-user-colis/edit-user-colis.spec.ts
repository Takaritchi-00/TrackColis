import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserColis } from './edit-user-colis';

describe('EditUserColis', () => {
  let component: EditUserColis;
  let fixture: ComponentFixture<EditUserColis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserColis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserColis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
