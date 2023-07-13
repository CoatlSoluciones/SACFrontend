import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusersComponent } from './admin-users.component';

describe('AdministrationComponent', () => {
  let component: AdminusersComponent;
  let fixture: ComponentFixture<AdminusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminusersComponent]
    });
    fixture = TestBed.createComponent(AdminusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
