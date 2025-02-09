import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalServiceComponent } from './mechanical-service.component';

describe('MechanicalServiceComponent', () => {
  let component: MechanicalServiceComponent;
  let fixture: ComponentFixture<MechanicalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicalServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
