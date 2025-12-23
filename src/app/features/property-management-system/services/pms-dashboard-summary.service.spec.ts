import { TestBed } from '@angular/core/testing';

import { PmsDashboardSummaryService } from './pms-dashboard-summary.service';

describe('PmsDashboardSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmsDashboardSummaryService = TestBed.get(PmsDashboardSummaryService);
    expect(service).toBeTruthy();
  });
});
