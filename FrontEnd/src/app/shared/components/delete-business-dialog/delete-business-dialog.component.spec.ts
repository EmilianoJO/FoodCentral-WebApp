import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusinessDialogComponent } from './delete-business-dialog.component';

describe('DeleteBusinessDialogComponent', () => {
  let component: DeleteBusinessDialogComponent;
  let fixture: ComponentFixture<DeleteBusinessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBusinessDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBusinessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
