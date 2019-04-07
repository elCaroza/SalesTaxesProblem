/*
 * This service manage data from JSON to angular component
 */

import { Injectable } from '@angular/core';
import { IOutputs } from '../models/interfaces';
import { PRICES_FIELD, TOFIXED_NUMB, STEP_ON_ROUNDING } from '../models/constants';
import { data } from '../../assets/data/config.json';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor() {}

  // Create and get Input and Output data from json file (SHARED METHOD)
  public getBaskets = () : any => {
    let outputs = [] as IOutputs;
    for( var input in data.inputs ) {
      var current = data.inputs[input];
      var totalAmount = 0;
      var amountTaxes = 0;
      current.map( item => {
        var tax = 0;

        // Calculate basic sales tax ( +10% )
        if( typeof item.taxes === "boolean" && item.taxes == true ){
          tax += this.calculateTaxes( item.price, data.taxes.default );
        }

        // Calcalate import duty additional tax ( +5% )
        if( item.imported == true ){
          tax += this.calculateTaxes( item.price, data.taxes.import );
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
        total : totalAmount
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
  private calculateTaxes = ( price : number, findPercentual : number ) : number => {
    let newTax = this.getNumberFixed( Number( price * findPercentual / 100 ) ) as string;
    return this.roundNumber( newTax );
  }

  // Round to the nearest 0.05 number (INTERNAL PURPOSE)
  private roundNumber = ( strNumb : string ) : number => {
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
