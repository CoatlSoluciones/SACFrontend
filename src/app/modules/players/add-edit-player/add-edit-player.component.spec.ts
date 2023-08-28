import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlayerComponent } from './add-edit-player.component';

describe('AddEditPlayerComponent', () => {
  let component: AddEditPlayerComponent;
  let fixture: ComponentFixture<AddEditPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPlayerComponent]
    });
    fixture = TestBed.createComponent(AddEditPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
