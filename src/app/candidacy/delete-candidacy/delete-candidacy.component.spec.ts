import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCandidacyComponent } from './delete-candidacy.component';

describe('DeleteCandidacyComponent', () => {
  let component: DeleteCandidacyComponent;
  let fixture: ComponentFixture<DeleteCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
