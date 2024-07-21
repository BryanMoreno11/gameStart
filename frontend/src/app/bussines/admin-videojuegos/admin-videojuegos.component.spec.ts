import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideojuegosComponent } from './admin-videojuegos.component';

describe('AdminVideojuegosComponent', () => {
  let component: AdminVideojuegosComponent;
  let fixture: ComponentFixture<AdminVideojuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVideojuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVideojuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
