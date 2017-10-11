import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileResultTabComponent } from './compile-result-tab.component';

describe('CompileResultTabComponent', () => {
  let component: CompileResultTabComponent;
  let fixture: ComponentFixture<CompileResultTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompileResultTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompileResultTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
