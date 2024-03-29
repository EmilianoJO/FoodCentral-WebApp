import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessFormComponent } from './new-business-form.component';

describe('NewBusinessFormComponent', () => {
  let component: NewBusinessFormComponent;
  let fixture: ComponentFixture<NewBusinessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBusinessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBusinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
