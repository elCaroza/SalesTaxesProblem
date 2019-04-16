/*
 * This service manage data from JSON to angular component
 */

import { Injectable, Inject } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { IOutputs, IAppConfig } from '../models/interfaces';
import { APP_CONFIG } from '../models/app.config';
import { PRICES_FIELD, TOFIXED_NUMB, STEP_ON_ROUNDING } from '../models/constants';
import { testData } from '../testing/services/manage-data';
import { data } from '../../assets/data/config.json';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {
  public config;
  private currentData = new Subject();

  constructor(@Inject(APP_CONFIG) config: IAppConfig) {
    this.config = config;

    // Just for testing purpose
    if( this.config.mode == "testing" )
      this.currentData.subscribe({
        next : ( newObj : any ) => {
          console.log( "next:" )
          console.log( newObj )
        },
        error : ( err ) => {
          console.log( "error:" )
          console.log( err )
        },
        complete : () => {
          console.log( "completed!" )
        }
      })
  }

  // Set new struct data
  set = () : void => {
    let newData;

    // serve mode
    if( this.config.mode == "serve" ) {
      newData = {
        salesList : this.getBaskets( data )
      };
    }

    // testing mode
    if( this.config.mode == "testing" ) {
      let testDataRandomized = testData( data );
      newData = {
        updateTime : new Date(),
        taxes : testDataRandomized.taxes,
        salesList : this.getBaskets( testDataRandomized )
      }
    }
    this.currentData.next( newData );
    if( this.config.mode == "serve" )
      this.currentData.complete();
  }

  // Get an observable created on "set" method above
  get = () : Observable<any> => {
    return this.currentData.asObservable();
  }

  // Create and get Input and Output data from json file (SHARED METHOD)
  private getBaskets = ( inputData ) : any => {
    let outputs = [] as IOutputs;
    for( var input in inputData.inputs ) {
      var current = inputData.inputs[input];
      var totalAmount = 0;
      var amountTaxes = 0;
      current.map( item => {
        var tax = 0;

        // Calculate "basic" sales tax
        if( typeof item.taxes === "boolean" && item.taxes == true ){
          tax += this.calculateTaxes( item.price, inputData.taxes.default );
        }

        // Calcalate "import duty additional" sales tax
        if( item.imported == true ){
          tax += this.calculateTaxes( item.price, inputData.taxes.import );
        }

        // Calculate new outer price (avaiable just on INPUT section )
        item[ PRICES_FIELD.OUT ] = ( ( item.price + tax ) * item.quantity );

        // Amount of total taxes
        amountTaxes += ( tax * item.quantity );

        // Update total price
        totalAmount += item[ PRICES_FIELD.OUT ];
      })
      outputs[ input ] = {
        data : current,
        salesTaxes : this.getNumberFixed( this.roundNumber( this.getNumberFixed(amountTaxes) ) ),
        total : this.getNumberFixed( totalAmount )
      };
    }
    return outputs;
  }

  // Fix decimal number (SHARED METHOD)
  // PS: get "any" type for pluri purpose
  public getNumberFixed = ( inputNumb ) : any => {
    return inputNumb.toFixed( TOFIXED_NUMB );
  }

  // Calculate and get current tax percentual with rounding (INTERNAL PURPOSE)
  public calculateTaxes = ( price : number, findPercentual : number ) : number => {
    let newTax = this.getNumberFixed( Number( price * findPercentual / 100 ) ) as string;
    return this.roundNumber( newTax );
  }

  // Round to the nearest 0.05 number (INTERNAL PURPOSE)
  public roundNumber = ( strNumb : string ) : number => {
    var resolved = false;
    while( !resolved ) {
      let lastFigure = Number( strNumb[ strNumb.length - 1 ] );

      // Come out if number is %x.x0 or %x.x5
      if( lastFigure == 0 || lastFigure == 5 )
        resolved = true;
      else {

        // Increment value on 0.01
        strNumb = this.getNumberFixed( ( Number( strNumb ) + STEP_ON_ROUNDING ) ) as string;
      }
    }
    return parseFloat( strNumb );
  }
}
