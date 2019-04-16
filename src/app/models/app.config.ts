import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./interfaces";

export let APP_CONFIG = new InjectionToken<IAppConfig>('AppConfigObject')

const ServeConfig: IAppConfig = {
  mode: "serve"
};

// Values on the object below are settings for testing purposes, see more src/app/testing/services/manage-data.ts
export const TestingConfig: IAppConfig = {
  mode: "testing",
  css : "testing__content-box",
  taxes : {
    MAX_DEFAULT: 100,
    MAX_IMPORT : 100
  },
  importedVect : [true, false],
  item : {
    MAX_QUANTITY : 10,
    MAX_PRICE : 100
  },
  // This object set testing PUBLIC functions of service, each item is the name of the function within service
  testService : {
    getNumberFixed : [
      { numb: 50.277227, res : '50.28'},
      { numb: 60.277227, res : '60.28'}
    ],
    calculateTaxes : [
      { numb : 100, percent: 20, res: 20},
      { numb : 100, percent: 30, res: 30},
      { numb : 100, percent: 40, res: 40}
    ],
    roundNumber : [
      { numb: '50.277227', res : 50.30},
      { numb: '50.227227', res : 50.25}
    ],
  }
};

// Values below called on providers' entry modules both serve and testing mode of entire app
export const ProviderTesting_ManagerDataService = { provide: APP_CONFIG, useValue: TestingConfig };
export const ProviderServe_ManagerDataService = { provide: APP_CONFIG, useValue: ServeConfig };
