import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettrashComponent } from './gettrash.component';

describe('GettrashComponent', () => {
  let component: GettrashComponent;
  let fixture: ComponentFixture<GettrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
