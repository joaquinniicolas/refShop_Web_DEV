import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPedidoComponentComponent } from './agregar-pedido-component.component';

describe('AgregarPedidoComponentComponent', () => {
  let component: AgregarPedidoComponentComponent;
  let fixture: ComponentFixture<AgregarPedidoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPedidoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPedidoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
