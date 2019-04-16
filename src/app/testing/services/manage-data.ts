/*
 * This snippet is avaiable just on testing mode!
 */

import { TestingConfig } from '../../models/app.config';

// Get a random number
/*
  PARAMS :
  - maxRange : max value to calculate
  - isInt : if the result need to be int or float
  - zeroIsValid : if the 0 value is avaiable
*/
const getRandomNumber = ( maxRange : number, isInt : boolean, zeroIsValid : boolean ) : number => {
  let numb = (Math.random() * ( maxRange + 1 ));
  if( !zeroIsValid && numb < 1) numb += 1;
  if( isInt )
    numb = Math.floor( numb );
  return numb;
}

// Create custom randomized data in the same format as data JSON
export const testData = ( data : any ) : any => {
  let newData = {
    taxes : {
      ...data.taxes,
      default : getRandomNumber( TestingConfig.taxes.MAX_DEFAULT, true, false ),
      import : getRandomNumber( TestingConfig.taxes.MAX_IMPORT, true, false )
    },
    inputs : []
  };

  // buffer creation
  let buffer = {};
  ( data.inputs ).map( item => {
    item.map( current => {
      if( !buffer[ current.description ] )
        buffer[ current.description ] = current.taxes
    })
  });
  let bufferKeys = Object.keys( buffer );

  // re-write new data.inputs
  let newInputs = data.inputs;
  ( newInputs ).map( item => {
    item.map( current => {
      let newObj = bufferKeys[ getRandomNumber( ( bufferKeys.length -1 ), true, true ) ];
      current.description = newObj;
      current.taxes = buffer[ newObj ];
      current.quantity = getRandomNumber( TestingConfig.item.MAX_QUANTITY, true, false );
      current.price = getRandomNumber( TestingConfig.item.MAX_PRICE, false, false );
      current.imported = TestingConfig.importedVect[ getRandomNumber( 1, true, true ) ];
    })
  });
  newData.inputs = newInputs;
  return newData;
}
