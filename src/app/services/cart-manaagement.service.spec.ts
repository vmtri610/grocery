import { TestBed } from '@angular/core/testing';

import { CartManaagementService } from './cart-manaagement.service';

describe('CartManaagementService', () => {
  let service: CartManaagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartManaagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
