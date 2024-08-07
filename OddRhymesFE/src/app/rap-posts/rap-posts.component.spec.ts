import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapPostsComponent } from './rap-posts.component';

describe('RapPostsComponent', () => {
  let component: RapPostsComponent;
  let fixture: ComponentFixture<RapPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
