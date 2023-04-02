import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiadminComponent } from './hiadmin.component';

describe('HiadminComponent', () => {
  let component: HiadminComponent;
  let fixture: ComponentFixture<HiadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
