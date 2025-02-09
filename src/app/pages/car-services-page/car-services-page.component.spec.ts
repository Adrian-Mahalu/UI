import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServicesPageComponent } from './car-services-page.component';

describe('CarServicesPageComponent', () => {
  let component: CarServicesPageComponent;
  let fixture: ComponentFixture<CarServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarServicesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
