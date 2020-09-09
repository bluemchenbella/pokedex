import { TestBed } from '@angular/core/testing';

import { PokeService } from './poke.service';
import {HttpClientModule} from '@angular/common/http';

describe('PokeService', () => {
  let service: PokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(PokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
