import { TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ProviderTesting_ManagerDataService, TestingConfig } from '../models/app.config';
import { ManageDataService } from './manage-data.service';

describe('ManageDataService', () => {
  let service: ManageDataService;
  let de : DebugElement;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProviderTesting_ManagerDataService,
      ManageDataService
    ]
  }));
  beforeEach(() => {
    // service = de.injector.get(ManageDataService);
    service = TestBed.get(ManageDataService);
  });

  it('should be created', async(() => {
    expect(service).toBeTruthy();
  }));

  let getNumberFixedList = TestingConfig.testService.getNumberFixed;
  for(var i=0; i<getNumberFixedList.length; i++){
    let current = getNumberFixedList[i];
    it('.getNumberFixed of '+current.numb, () => {
      expect(service.getNumberFixed(current.numb)).toBe(current.res);
    });
  }

  let calculateTaxesList = TestingConfig.testService.calculateTaxes;
  for(var i=0; i<calculateTaxesList.length; i++){
    let current = calculateTaxesList[i];
    it('.calculateTaxes '+current.percent+'% of '+current.numb, () => {
      expect(service.calculateTaxes(current.numb, current.percent)).toBe(current.res);
    });
  }

  let roundNumberList = TestingConfig.testService.roundNumber;
  for(var i=0; i<roundNumberList.length; i++){
    let current = roundNumberList[i];
    it('.roundNumber '+current.numb+' of '+current.res, () => {
      expect(service.roundNumber(current.numb)).toBe(current.res);
    });
  }
});
