import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterManagerComponent } from './character-manager.component';

describe('ThirdPageComponent', () => {
  let component: CharacterManagerComponent;
  let fixture: ComponentFixture<CharacterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
