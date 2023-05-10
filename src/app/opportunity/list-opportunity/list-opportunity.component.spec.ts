import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpportunityComponent } from './list-opportunity.component';

describe('ListOpportunityComponent', () => {
  let component: ListOpportunityComponent;
  let fixture: ComponentFixture<ListOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOpportunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
