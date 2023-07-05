import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMesaComponent } from './add-mesa.component';

describe('AddMesaComponent', () => {
  let component: AddMesaComponent;
  let fixture: ComponentFixture<AddMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
