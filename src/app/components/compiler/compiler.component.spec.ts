import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilerComponent } from './compiler.component';

describe('CompilerComponent', () => {
  let component: CompilerComponent;
  let fixture: ComponentFixture<CompilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
