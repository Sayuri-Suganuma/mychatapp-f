import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatroomComponent } from './create-chatroom.component';

describe('CreateChatroomComponent', () => {
  let component: CreateChatroomComponent;
  let fixture: ComponentFixture<CreateChatroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChatroomComponent]
    });
    fixture = TestBed.createComponent(CreateChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
