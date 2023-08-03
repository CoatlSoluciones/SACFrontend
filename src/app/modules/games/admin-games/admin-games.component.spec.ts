import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesComponent } from './admin-games.component';

describe('AdminGamesComponent', () => {
  let component: AdminGamesComponent;
  let fixture: ComponentFixture<AdminGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGamesComponent]
    });
    fixture = TestBed.createComponent(AdminGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
