import { TestBed } from '@angular/core/testing';

import { RapPostsService } from './rap-posts.service';

describe('RapPostsService', () => {
  let service: RapPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
