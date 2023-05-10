import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesStatsComponent } from './specialties-stats.component';

describe('SpecialtiesStatsComponent', () => {
  let component: SpecialtiesStatsComponent;
  let fixture: ComponentFixture<SpecialtiesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtiesStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtiesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
