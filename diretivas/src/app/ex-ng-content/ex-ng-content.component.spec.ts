import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExNgContentComponent } from './ex-ng-content.component';

describe('ExNgContentComponent', () => {
  let component: ExNgContentComponent;
  let fixture: ComponentFixture<ExNgContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExNgContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExNgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
