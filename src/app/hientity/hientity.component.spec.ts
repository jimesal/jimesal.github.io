import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HientityComponent } from './hientity.component';

describe('HientityComponent', () => {
  let component: HientityComponent;
  let fixture: ComponentFixture<HientityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HientityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HientityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
