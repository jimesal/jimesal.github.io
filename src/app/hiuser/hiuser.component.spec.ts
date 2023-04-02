import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiuserComponent } from './hiuser.component';

describe('HiuserComponent', () => {
  let component: HiuserComponent;
  let fixture: ComponentFixture<HiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
