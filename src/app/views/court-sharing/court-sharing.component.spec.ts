import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtSharingComponent } from './court-sharing.component';

describe('CourtSharingComponent', () => {
  let component: CourtSharingComponent;
  let fixture: ComponentFixture<CourtSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
