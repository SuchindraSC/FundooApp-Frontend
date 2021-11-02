import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetarchieveComponent } from './getarchieve.component';

describe('GetarchieveComponent', () => {
  let component: GetarchieveComponent;
  let fixture: ComponentFixture<GetarchieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetarchieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetarchieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
