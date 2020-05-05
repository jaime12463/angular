import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JimmyComponent } from './jimmy.component';

describe('JimmyComponent', () => {
  let component: JimmyComponent;
  let fixture: ComponentFixture<JimmyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JimmyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JimmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
