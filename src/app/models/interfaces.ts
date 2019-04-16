/*
 * List of interface and custom types
 */

// Optional values used just on testing mode
export interface IAppConfig {
  mode: string;
  css? : string;
  taxes?: any;
  importedVect? : any;
  item? : any;
  testService? : any;
}

// Used for output data of app
export interface IOutputs {
  salesTaxes?: number;
  total?: number;
  data?: any;
}
